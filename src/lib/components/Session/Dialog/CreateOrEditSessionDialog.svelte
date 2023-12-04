<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import Fa from 'svelte-fa';
	import type { DateFormat, ISession } from '../../../../Interfaces';
	import Button from '../../Button.svelte';
	import { faFileEdit, faMinus, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
	import NumberInput from '$lib/components/NumberInput.svelte';

	const today = new Date();
	let deleteConfirmationDialog: HTMLDialogElement;
	let todayAsString = today.toISOString().split('T')[0] as DateFormat;
	let activeCampaign = $authStore.data.active_campaign;
	let active_persona = $authStore.data.active_persona;
	let defaultSession: ISession = {
		date: todayAsString,
		description: '',
		name: '',
		owner: {
			name: active_persona?.name ? active_persona?.name : '',
			type: 'master',
			id: active_persona?.id,
			campaignId: activeCampaign ? activeCampaign : '',
		},
		slots: 4,
		status: 'available',
		personas: [],
	};
	const MAX_SESSION_SLOTS = 10;
	const MIN_SESSION_SLOTS = 1;

	// --- Props ---
	export let session: ISession = { ...defaultSession };
	export let dialog: HTMLDialogElement;
	export let type: 'create' | 'edit';

	async function createSession() {
		if (!activeCampaign) return;
		if (!(active_persona && active_persona?.id)) return;

		console.log('AC', activeCampaign);
		const newSessionId = await sessionHandlers.createSessionForCampaign(activeCampaign, session);

		console.log('ID', newSessionId);
		session.id = newSessionId;
		sessionStore.update((curr) => [...curr, session]);
		dialog.close();
		resetForm();
		session = { ...defaultSession };
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
		on:submit|preventDefault={() => {
			type === 'edit' ? editSession() : createSession();
		}}
		class="bg-white flex flex-col mx-auto w-2/3 rounded-2xl font-inknut overflow-hidden"
	>
		<div class="bg-black text-white py-5 px-10 text-xl flex items-center justify-between">
			<div class="flex items-center gap-2">
				{#if type === 'edit'}
					<Fa class="text-2xl" icon={faFileEdit} />
				{/if}
				{#if type === 'create'}
					<Fa class="text-2xl" icon={faPlusCircle} />
				{/if}
				<p class="">
					{type === 'edit'
						? `Edit: ${session?.name}`
						: `Create: ${session?.name ? session?.name : 'New Session'}`}
				</p>
			</div>

			<div class="">
				{#if type === 'edit'}
					<Button
						handleClick={() => deleteConfirmationDialog.showModal()}
						className="bg-red-500 hover:bg-red-600 py-1.5">Delete</Button
					>
				{/if}
			</div>
		</div>
		<div class="px-16 flex flex-col gap-8 py-10">
			<div class="flex items-center justify-between gap-20">
				<div class="flex flex-col gap-2 w-2/3">
					<label for="title" class="text-lg font-semibold">Title</label>
					<input
						class="border border-gray rounded-sm py-0.5 px-1"
						name="title"
						placeholder="Title..."
						bind:value={session.name}
						type="text"
						required
					/>
				</div>
				<div class="flex gap-2 flex-col w-1/3">
					<label class="text-lg font-semibold" for="date">Date</label>
					<input
						name="date"
						class="py-1 border border-gray px-3"
						placeholder="date"
						bind:value={session.date}
						type="date"
						required
					/>
				</div>
			</div>
			<div class=" flex gap-4 items-center">
				<label for="slots" class="text-lg font-semibold"> Player Limit</label>

				<NumberInput max={MAX_SESSION_SLOTS} min={MIN_SESSION_SLOTS} bind:value={session.slots} />
				<!-- <div class="flex items-center">
					<button
						on:click={() => {
							session.slots = Math.max(MIN_SESSION_SLOTS, session.slots - 1);
						}}
						type="button"
						class="bg-gray-400 w-10 h-10 hover:bg-gray-500 flex items-center justify-center text-white"
						><Fa icon={faMinus} />
					</button>
					<input
						class="border border-gray h-10 w-20 flex items text-center justify-center"
						name="slots"
						value={session.slots}
						type="number"
						min="1"
						max="10"
						required
					/>
					<button
						on:click={() => {
							session.slots = Math.min(MAX_SESSION_SLOTS, session.slots + 1);
						}}
						type="button"
						class="bg-gray-400 hover:bg-gray-500 w-10 h-10 flex items-center justify-center text-white"
					>
						<Fa icon={faPlus} />
					</button>
				</div> -->
				{#if session.slots <= MIN_SESSION_SLOTS}
					<p>Minimum number of players is 1</p>
				{/if}
				{#if session.slots >= MAX_SESSION_SLOTS}
					<p>Maximum number of players is 10</p>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-lg font-semibold" for="description">Info</label>
				<textarea
					name="description"
					class="min-h-[150px] border border-gray-400 rounded-sm p-4"
					placeholder="Describe your campaign"
					bind:value={session.description}
				/>
			</div>
			<div class="flex items-center gap-3 justify-end mt-10">
				<Button handleClick={() => resetForm()} className="bg-gray-400 hover:bg-gray-500"
					>Cancel</Button
				>
				<Button type="submit" className="bg-primary text-white">
					{type === 'edit' ? 'Save' : 'Create session'}
				</Button>
			</div>
		</div>
	</form>
</Dialog>

<Dialog bind:dialog={deleteConfirmationDialog}>
	<div class="p-4 bg-white flex flex-col gap-2 mx-auto">
		<p>Do you really want to delete the entry?</p>
		<div class="flex items-center">
			<button type="button" on:click={() => deleteConfirmationDialog.close()} class="p-2"
				>Do not delete
			</button>
			<button type="button" on:click={deleteSession} class="bg-red-500"> Delete forever </button>
		</div>
	</div>
</Dialog>
