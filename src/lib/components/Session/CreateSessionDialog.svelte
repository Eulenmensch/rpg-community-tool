<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import type { DateFormat, ISession } from '../../../Interfaces';

	let dialog: HTMLDialogElement;
	let activeCampaign = $authStore.data.active_campaign;
	let active_persona = $authStore.data.active_persona;

	let sessionName: string;
	let numberOfPlayers: number;

	const today = new Date();
	let todayAsString = today.toISOString().split('T')[0] as DateFormat;
	let sessionDate: DateFormat = todayAsString;
	let description: string;

	async function createSession() {
		if (!activeCampaign) return;
		const newSession: ISession = {
			id: '',
			date: sessionDate,
			name: sessionName,
			description: description ? description : '',
			slots: numberOfPlayers,
			status: 'available',
			personas: [],
		};
		if (active_persona) newSession.personas.push(active_persona);
		const newSessionId = await sessionHandlers.createSessionForCampaign(activeCampaign, newSession);
		newSession.id = newSessionId;
		sessionStore.update((curr) => [...curr, newSession]);
		dialog.close();

		const form = document.getElementById('create_session_form') as HTMLFormElement;
		if (!form) return;
		form.reset();
	}
</script>

<button on:click={() => dialog.showModal()}>Create Session</button>
<Dialog bind:dialog>
	<form id="create_session_form" on:submit={createSession} class="p-4 bg-white flex flex-col gap-2">
		<p>Create a new session</p>
		<input placeholder="name" bind:value={sessionName} type="text" required />
		<input placeholder="Number of players" bind:value={numberOfPlayers} type="number" required />
		<input placeholder="date" bind:value={sessionDate} type="date" required />
		<textarea placeholder="Describe your campaign" bind:value={description} />
		<button type="submit" class="bg-primary text-white px-2 py-1 rounded-sm">Create session</button>
	</form>
</Dialog>
