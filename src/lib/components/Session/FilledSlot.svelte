<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers } from '$lib/store/sessionStore';
	import type { ISession, IUserData } from '../../../Interfaces';

	export let session: ISession;
	let userData = $authStore.data;

	function handleUnsubscribeFromSession(session: ISession, userData: IUserData) {
		if (!userData?.active_persona || !session?.id) return;
		sessionHandlers.unsubscribeFromSession(session.id, userData.active_persona);
	}
</script>

<div class="relative inline-block group">
	<button
		on:click={() => handleUnsubscribeFromSession(session, userData)}
		class="h-10 w-10 rounded-full bg-gradient-to-b from-[#b61414] to-[#edcbf1] border-[5px] border-black"
	/>
	<div
		class="shadow border border-x-gray-400/30 absolute whitespace-nowrap -translate-x-1/2 left-1/2 py-1 px-2 mt-0.5 rounded-sm transition group-hover:opacity-100 opacity-0 duration-300"
	>
		Unsubscribe
	</div>
</div>
