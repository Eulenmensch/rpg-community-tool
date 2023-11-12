<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import type { DateFormat, ISession } from '../../../Interfaces';

	const today = new Date();
	let deleteConfirmationDialog: HTMLDialogElement;
	let todayAsString = today.toISOString().split('T')[0] as DateFormat;
	let activeCampaign = $authStore.data.active_campaign;
	let active_persona = $authStore.data.active_persona;
	let defaultSession: ISession = {
		date: todayAsString,
		description: '',
		name: '',
		owner: active_persona?.id ? active_persona?.id : '',
		personas: [],
		slots: 4,
		status: 'available',
	};

	// --- Props ---
	export let session: ISession = { ...defaultSession };
	export let dialog: HTMLDialogElement;
	export let type: 'create' | 'edit';

	async function createSession() {
		if (!activeCampaign) return;
		if (!(active_persona && active_persona?.id)) return;

		if (active_persona) session.personas.push(active_persona);
		const newSessionId = await sessionHandlers.createSessionForCampaign(activeCampaign, session);
		session.id = newSessionId;
		sessionStore.update((curr) => [...curr, session]);
		dialog.close();
		resetForm();
	}

	async function editSession() {
		if (!activeCampaign) return;
		if (!(active_persona && active_persona?.id)) return;
		if (!session?.id) return;

		await sessionHandlers.editSession(activeCampaign, session);

		sessionStore.update((curr) =>
			curr.map((_session) => {
				if (_session.id === session?.id) {
					return session;
				}
				return _session;
			}),
		);

		resetForm();
	}

	function resetForm() {
		const form = document.getElementById('create_session_form') as HTMLFormElement;
		if (!form) return;
		form.reset();
		session = { ...defaultSession };
		dialog.close();
		deleteConfirmationDialog.close();
	}

	async function deleteSession() {
		if (!activeCampaign) return;
		if (!(active_persona && active_persona?.id)) return;
		if (!session?.id) return;
		sessionHandlers.deleteSession(activeCampaign, session?.id);

		sessionStore.update((curr) => curr.filter((_session) => session.id != _session.id));
		resetForm();
	}
</script>

<Dialog bind:dialog on:close={resetForm}>
	<form
		id="create_session_form"
		on:submit={() => {
			type === 'edit' ? editSession() : createSession();
		}}
		class="p-4 bg-white flex flex-col gap-2 mx-auto w-2/3"
	>
		<p>{type === 'edit' ? `Edit session: ${session?.name}` : 'Create a new session'}</p>
		<input placeholder="name" bind:value={session.name} type="text" required />
		<input placeholder="Number of players" bind:value={session.slots} type="number" required />
		<input placeholder="date" bind:value={session.date} type="date" required />
		<textarea placeholder="Describe your campaign" bind:value={session.description} />
		<button class="bg-red-500" type="button" on:click={() => deleteConfirmationDialog.showModal()}
			>Delete Session</button
		>
		<button type="submit" class="bg-primary text-white px-2 py-1 rounded-sm">
			{type === 'edit' ? 'Edit' : 'Create'} session</button
		>
	</form>
</Dialog>

<Dialog bind:dialog={deleteConfirmationDialog}>
	<div class="p-4 bg-white flex flex-col gap-2 mx-auto">
		<p>Do you really want to delete the entry?</p>
		<div class="flex items-center">
			<button type="button" on:click={() => deleteConfirmationDialog.close()} class="p-2"
				>Do not delete
			</button>
			<button type="button" on:click={deleteSession} class="bg-red-500 p-2">
				Delete forever
			</button>
		</div>
	</div>
</Dialog>
