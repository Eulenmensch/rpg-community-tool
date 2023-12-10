<script lang="ts">
	import Session from '$lib/components/Session/Session.svelte';
	import { authStore } from '$lib/store/authStore';
	import { onMount } from 'svelte';
	import type { ICampaign, IPersona } from '../Interfaces';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import CreateSessionDialog from '$lib/components/Session/Dialog/CreateOrEditSessionDialog.svelte';
	import Button from '$lib/components/Button.svelte';
	import WelcomeToCampaignScreen from '$lib/components/Welcome/WelcomeToCampaignScreen.svelte';
	import { campaignHandlers } from '$lib/store/campaignStore';

	let personas: IPersona[] = [];
	let activeCampaignId = $authStore.data.active_persona?.campaignId;
	let campaign: ICampaign;
	let dialog: HTMLDialogElement;

	onMount(getSessions);
	onMount(getPersonas);
	onMount(getCampaign);

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData || !activeCampaignId) return;
		personas = await personaHandlers.getAllPersonasOfUserInActiveCampaign(
			userData.uid,
			activeCampaignId,
		);
	}

	async function getCampaign() {
		if (!activeCampaignId) return;
		campaign = await campaignHandlers.getCampaign(activeCampaignId);
	}

	async function getSessions() {
		if (!activeCampaignId) return;
		const retrievedSessions = await sessionHandlers.getSessionsByCampaign(activeCampaignId);
		sessionStore.set(retrievedSessions);
	}
</script>

{#if personas.length == 0}
	<WelcomeToCampaignScreen />
{:else}
	<div class="p-4 font-inknut">
		<div class="flex py-2 flex-col gap-4">
			<div class="flex flex-col gap-2 px-[5%] my-14">
				<div class="flex items-center mb-14 gap-8">
					<h1 class="text-xl font-bold ml-1">{campaign?.name}</h1>
					{#if campaign?.owner_id === $authStore?.data?.uid}
						<Button
							handleClick={() => {
								dialog.showModal();
							}}
							className="">Create Session</Button
						>
					{/if}
				</div>
				<div class="flex items-center gap-5 mb-2.5 ml-4 font-semibold">
					<span>Status</span>
					<span>GM</span>
					<span class="ml-6">Session Title</span>
					<div class="ml-auto flex items-center mr-5 gap-8">
						<span class="w-36">Date</span>
						<span class="w-36 text-right">Players</span>
						<span class="w-12 text-center">Slots</span>
						{#if campaign?.owner_id === $authStore?.data?.uid}
							<span class="w-10 tsext-center">Edit</span>
						{/if}
					</div>
				</div>
				{#each $sessionStore as session}
					<Session {session} />
				{/each}
				{#if $sessionStore.length <= 0}
					<p class="bg-gray-100 text-center py-6 px-2">
						Create your first sessions to start your adventure.
					</p>
				{/if}
			</div>
		</div>
	</div>
	<CreateSessionDialog bind:dialog type="create" />
{/if}
