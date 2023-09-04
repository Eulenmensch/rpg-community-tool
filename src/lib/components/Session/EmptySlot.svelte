<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import type { ISession, IUserData } from '../../../Interfaces';

	export let session: ISession;
	let userData = $authStore.data;

	function joinSession(session: ISession, userData: IUserData) {
		if (!userData?.active_persona?.id || !session?.id || !userData?.active_persona?.campaignId) {
			console.log('error joining campaign');
			return;
		}
		sessionHandlers.joinSession(session.id, userData.active_persona);
		//TODO: Fix this, prevent multiple joins
		sessionStore.update((curr) => {
			const sessionToAddPersonaTo = { ...curr.find((_session) => _session.id === session.id) };
			if (!sessionToAddPersonaTo || !userData.active_persona) return curr;
			if (!sessionToAddPersonaTo.personas) return curr;
			sessionToAddPersonaTo.personas.push(userData.active_persona);
			const updatedSessions = curr.map((s) => (s.id === session.id ? sessionToAddPersonaTo : s));
			return updatedSessions;
		});
	}

	//TODO: Only show option to sign up when you are not part of the session already
</script>

<div class="relative inline-block group">
	<button on:click={() => joinSession(session, userData)}>
		<img
			class="cursor-pointer w-10"
			alt="An empty slots where players can sign up for session"
			src="/images/session_empty_slot.png"
		/>
	</button>
	<div
		class="shadow border border-x-gray-400/30 absolute whitespace-nowrap -translate-x-1/2 left-1/2 py-1 px-2 mt-0.5 rounded-sm transition group-hover:opacity-100 opacity-0 duration-300"
	>
		Sign Up
	</div>
</div>
