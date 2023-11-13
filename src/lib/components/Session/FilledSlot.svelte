<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import type { IPersona, ISession } from '../../../Interfaces';

	export let session: ISession;
	export let persona: IPersona;
	export let disableUnsubscribe = false;

	const { active_persona: activePersona } = $authStore.data;

	function handleUnsubscribeFromSession(session: ISession, activePersona: IPersona | null) {
		if (!activePersona || !session?.id) return;
		sessionHandlers.unsubscribeFromSession(session.id, activePersona);

		sessionStore.update((curr) =>
			curr.map((_session) => {
				if (_session.id === session.id) {
					return {
						..._session,
						personas: _session.personas.filter((persona) => persona.id !== activePersona.id),
					};
				}
				return _session;
			}),
		);
	}
</script>

<div class="relative inline-block group">
	<button
		disabled={activePersona?.id != persona.id || disableUnsubscribe}
		on:click={() => handleUnsubscribeFromSession(session, activePersona)}
		class="h-10 w-10 rounded-full bg-gradient-to-b from-[#b61414] to-[#edcbf1] border-[5px] border-black font-bold mb-0.5"
		>{persona.name.slice(0, 1)}</button
	>

	{#if activePersona?.id === persona.id && !disableUnsubscribe}
		<div
			class="shadow border border-x-gray-400/30 absolute whitespace-nowrap bg-white -translate-x-1/2 left-1/2 py-1 px-2 mt-0.5 rounded-sm transition group-hover:opacity-100 opacity-0 duration-300"
		>
			Unsubscribe
		</div>
	{/if}
</div>
