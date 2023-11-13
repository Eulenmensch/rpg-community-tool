<script lang="ts">
	import { faPlay } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../../Interfaces';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers } from '$lib/store/sessionStore';

	let activeCampaign = $authStore.data.active_campaign;

	export let session: ISession;

	async function handleGoToPreviousState() {
		if (!activeCampaign) return;
		if (session.status === 'available') return;

		await sessionHandlers.editSession(activeCampaign, {
			...session,
			status: session.status == 'closed' ? 'ongoing' : 'available',
		});
		session.status = session.status == 'closed' ? 'ongoing' : 'available';
	}

	async function handleGoToNextState() {
		if (!activeCampaign) return;
		if (session.status === 'closed') return;

		await sessionHandlers.editSession(activeCampaign, {
			...session,
			status: session.status == 'available' ? 'ongoing' : 'closed',
		});
		session.status = session.status == 'available' ? 'ongoing' : 'closed';
	}
</script>

<div class="flex gap-1">
	{#if session.status != 'available'}
		<button
			on:click={handleGoToPreviousState}
			class="h-10 w-8 bg-gray-400 hover:bg-gray-300 flex items-center justify-center rounded-lg"
		>
			<Fa class="ml-1 text-base pl-2 rotate-180 " icon={faPlay} />
		</button>
	{/if}
	<button
		on:click={handleGoToNextState}
		disabled={session.status === 'closed'}
		class="px-3 rounded-lg flex items-center gap-2 h-10
            {session.status === 'closed'
			? 'bg-gray-400 text-white'
			: 'bg-green-300 text-green-800 hover:bg-green-200'}"
	>
		<span class="px-2">
			{session.status === 'available' ? 'Start' : ''}
			{session.status === 'ongoing' ? 'Close' : ''}
			{session.status === 'closed' ? 'Closed' : ''}
		</span>
		{#if session.status != 'closed'}
			<div class="flex items-center">
				<div class="w-[1px] h-10 bg-green-800" />
				<Fa class="text-base pl-2" icon={faPlay} />
			</div>
		{/if}
	</button>
</div>
