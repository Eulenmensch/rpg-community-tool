<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers } from '$lib/store/sessionStore';
	import type { ISession } from '../../../Interfaces';

	export let session: ISession;
	let userData = $authStore.data;

	function joinSession(session: ISession) {
		if (!userData?.active_persona?.id || !session?.id || !userData?.active_persona?.campaignId) {
			console.log('error joining campaign');
			return;
		}
		sessionHandlers.joinSession(session.id, userData.active_persona);
	}
</script>

<button on:click={() => joinSession(session)}>
	<img
		class="cursor-pointer w-10"
		alt="An empty slots where players can sign up for session"
		src="/images/session_empty_slot.png"
	/>
</button>
