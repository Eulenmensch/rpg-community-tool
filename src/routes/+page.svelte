<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CreateSessionDialog from '$lib/components/Session/Dialog/CreateOrEditSessionDialog.svelte';
	import Session from '$lib/components/Session/Session.svelte';
	import WelcomeToCampaignScreen from '$lib/components/Welcome/WelcomeToCampaignScreen.svelte';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { faCopy } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { IPersona } from '../Interfaces';
	import Debug from '$lib/components/Debug/Debug.svelte';

	let personasInActiveCampaign: IPersona[] = [];
	let activeCampaignId = $authStore.data.active_persona?.campaignId;
	let dialog: HTMLDialogElement;
	let DEBUG = true;
	$: activePersonaIsGM = $campaignStore?.campaign?.owner_id === $authStore?.data?.uid;

	onMount(getSessions);
	onMount(getPersonasForActiveCampaign);
	onMount(getCampaign);

	async function getPersonasForActiveCampaign() {
		let userData = $authStore.data;
		if (!userData || !activeCampaignId) return;
		personasInActiveCampaign = await personaHandlers.getAllPersonasOfUserInActiveCampaign(
			userData.uid,
			activeCampaignId,
		);
	}

	async function getCampaign() {
		if (!activeCampaignId) return;
		$campaignStore.campaign = await campaignHandlers.getCampaign(activeCampaignId);
	}

	async function getSessions() {
		if (!activeCampaignId) return;
		const retrievedSessions = await sessionHandlers.getSessionsByCampaign(activeCampaignId);
		sessionStore.set(retrievedSessions);
	}

	function copyToClipboard(textToCopy: string | null | undefined) {
		if (!textToCopy) return;
		navigator?.clipboard?.writeText(textToCopy);
	}
</script>

{#if personasInActiveCampaign.length == 0}
	<WelcomeToCampaignScreen />
{:else}
	<div class="p-4 font-inknut">
		<div class="flex py-2 flex-col gap-4">
			<div class="flex flex-col gap-2 px-[5%] my-14">
				<div class="flex items-center mb-14 gap-12">
					<div class="ml-1">
						<h1 class="text-2xl font-bold">{$campaignStore?.campaign?.name}</h1>
						<div class="flex gap-2 mt-1 ml-1 text-dark/70">
							<p>Id: {activeCampaignId}</p>
							<button
								on:click|stopPropagation={() => copyToClipboard(activeCampaignId)}
								class="w-6 h-6 items-center justify-center flex rounded-sm hover:bg-slate-200 hover:text-primary opacity-80 hover:opacity-100"
							>
								<Fa icon={faCopy} />
							</button>
						</div>
					</div>
					{#if activePersonaIsGM}
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
						{#if $campaignStore?.campaign?.owner_id === $authStore?.data?.uid}
							<span class="w-10 tsext-center">Edit</span>
						{/if}
					</div>
				</div>
				{#each $sessionStore as session}
					<Session {session} />
				{/each}
				{#if $sessionStore.length <= 0}
					<p class="bg-gray-100 text-center py-6 px-2">
						{activePersonaIsGM
							? 'Create your first sessions to start your adventure.'
							: 'No Session inside the campaign yet. Ask your GM to create a session'}
					</p>
				{/if}
			</div>
		</div>
		{#if DEBUG}
			<Debug {campaignStore} {activeCampaignId} {authStore} />
			<div>activePersonaIsGm: {activePersonaIsGM}</div>
		{/if}
	</div>
	<CreateSessionDialog bind:dialog type="create" />
{/if}
