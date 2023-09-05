<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { onMount } from 'svelte';
	import type { IPersona, ISession, IUserData } from '../../../Interfaces';

	export let session: ISession;
	let { active_persona: activePersona } = $authStore.data;

	let personaIsPartOfSession: boolean | undefined;
	onMount(() => {
		sessionStore.subscribe((sessions) => {
			const foundSession = sessions.find((s) => s.id === session.id);
			personaIsPartOfSession = foundSession?.personas.includes(activePersona?.id as string);
		});
	});

	function joinSession(session: ISession, activePersona: IPersona | null) {
		if (
			!activePersona?.id ||
			!session?.id ||
			!activePersona?.campaignId ||
			personaIsPartOfSession
		) {
			console.log('Error joining session');
			return;
		}
		sessionHandlers.joinSession(session.id, activePersona);
		sessionStore.update((curr) =>
			curr.map((_session) => {
				if (_session.id === session.id) {
					return {
						..._session,
						personas: [..._session.personas, activePersona.id as string],
					};
				}
				return _session;
			}),
		);
	}
</script>

<div class="relative inline-block group">
	<button disabled={personaIsPartOfSession} on:click={() => joinSession(session, activePersona)}>
		<img
			class={`${personaIsPartOfSession ? 'cursor-default' : 'cursor-pointer'} w-10`}
			alt="An empty slots where players can sign up for session"
			src="/images/session_empty_slot.png"
		/>
	</button>

	{#if !personaIsPartOfSession}
		<div
			class="shadow border border-x-gray-400/30 absolute whitespace-nowrap -translate-x-1/2 left-1/2 py-1 px-2 mt-0.5 rounded-sm transition group-hover:opacity-100 opacity-0 duration-300"
		>
			Sign Up
		</div>
	{/if}
</div>
