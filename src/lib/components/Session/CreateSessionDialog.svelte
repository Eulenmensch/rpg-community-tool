<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import type { ISession } from '../../../Interfaces';

	let dialog: HTMLDialogElement;
	let activeCampaign = $authStore.data.active_campaign;

	async function createSession() {
		if (!activeCampaign) return;

		const newSession: ISession = {
			id: '',
			date: '21.12.2022',
			name: 'My new Session',
			description: `After the last hunting party going after the Weaverbeast did not manage to finish the job, a new opportunity has presented itself. The Weaverbeast and what is suspected to be its mate have been spotted by the party that helped evacuate Acumrash in the Forest to the East. 
            Of course, two beasts are more than one so bring your A-Game! Stock up on potions, upgrade your armor and maybe talk strategy before heading out. `,
			slots: 4,
			status: 'scheduled',
			personas: [],
		};
		//TODO: override id once session is created
		sessionHandlers.createSessionForCampaign(activeCampaign, newSession);
		sessionStore.update((curr) => [...curr, newSession]);
		dialog.close();
	}
</script>

<button on:click={() => dialog.showModal()}>Create Session</button>
<Dialog bind:dialog>
	<div class="p-4 bg-white">
		<div>Placeholder for session name</div>
		<div>Placeholder for session description</div>
		<div>Placeholder for session slots etc. ...</div>
		<button class="bg-primary text-white px-2 py-1 rounded-sm" on:click={createSession}
			>Create Test Session</button
		>
	</div>
</Dialog>
