<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Session from '$lib/components/Session/Session.svelte';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { onMount } from 'svelte';
	import type { IPersona } from '../Interfaces';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import CreateSessionDialog from '$lib/components/Session/Dialog/CreateOrEditSessionDialog.svelte';
	import Button from '$lib/components/Button.svelte';
	import WelcomeToCampaignScreen from '$lib/components/Welcome/WelcomeToCampaignScreen.svelte';

	let code = '';
	let campaign = $campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign);
	let showErrorMessage = false;
	let showSuccessMessage = false;
	let personas: IPersona[] = [];
	let activeCampaignId = $authStore.data.active_persona?.campaignId;
	const debug = true;

	onMount(getSessions);
	onMount(getPersonas);

	async function createCampaign() {
		let userData = $authStore.data;
		campaignHandlers.createCampaign(userData.uid, 'Une', 'My new Campaign');
	}

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData || !activeCampaignId) return;
		personas = await personaHandlers.getAllPersonasOfUserInActiveCampaign(
			userData.uid,
			activeCampaignId,
		);
		console.log(personas);
	}

	async function getSessions() {
		if (!activeCampaignId) return;
		const retrievedSessions = await sessionHandlers.getSessionsByCampaign(activeCampaignId);
		sessionStore.set(retrievedSessions);
	}

	async function handleJoinCampaign() {
		let personaData = $authStore.data;

		console.log('PERSONADATA', personaData);
		//TOD: This should be okay!
		if (!personaData.active_persona || !personaData.active_persona.id) return;

		console.log(1);
		const campaignData = await campaignHandlers.joinCampaignWithoutPersona(code, personaData.uid);

		if (campaignData) {
			showSuccessMessage = true;
			setTimeout(() => (showSuccessMessage = false), 2000);
			campaignStore.update((curr) => ({
				campaigns: [...curr.campaigns, campaignData],
				selectedCampaign: campaignData.id ? campaignData.id : null,
			}));
			authStore.update((curr) => ({
				...curr,
				data: {
					...curr.data,
					active_campaign: campaignData.id ? campaignData.id : null,
					active_persona: null,
				},
			}));
		} else {
			showErrorMessage = true;
			setTimeout(() => (showErrorMessage = false), 2000);
		}
	}

	let dialog: HTMLDialogElement;
</script>

{#if personas.length == 0}
	<WelcomeToCampaignScreen />
{:else}
	<div class="p-4 font-inknut">
		{#if debug}
			<div class="bg-green-200">
				<h1 class="text-lg font-semibold mb-6">Protected Landing - Dashboard page</h1>
				<div class="flex flex-col p-2 rounded bg-slate-100 w-72">
					<span class="font-semibold mb-1">{campaign?.name}</span>
					<div class="flex flex-col">
						<span>Campaign code</span>
						<span>{activeCampaignId}</span>
					</div>
					<span>Players:</span>
				</div>
				<div class="bg-red-200">
					<h2>Campaign-Joiner-Tester</h2>
					<p>Enter a campaign code of a different campaign to join another one</p>
					<input type="text" bind:value={code} class="bg-slate-100 py-1" />
					<button on:click={handleJoinCampaign} class="bg-primary text-white px-4 py-1 rounded"
						>Join</button
					>
				</div>
				<div>
					<h2>Test Buttons</h2>
					<button class="bg-red-500 p-1 mx-1" on:click={createCampaign}>Create Campaign</button>
				</div>
			</div>
		{/if}
		<div class="flex py-2 flex-col gap-4">
			<div class="flex flex-col gap-2 px-[5%]">
				<Button
					handleClick={() => {
						dialog.showModal();
					}}
					className="mx-auto my-14">Create</Button
				>
				<div class="flex items-center gap-5 mb-2.5 ml-4">
					<span>Status</span>
					<span>GM</span>
					<span class="ml-6">Session Title</span>
					<div class="ml-auto mr-10 flex items-center gap-12">
						<span class="mr-32">Date</span>
						<span>Players</span>
						<span>Slots</span>
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
			<div>
				<Alert showAlert={showErrorMessage} text="You got the wrong code mate" color="bg-red-500" />
				<Alert showAlert={showSuccessMessage} text="Successfully joined" color="bg-green-500" />
			</div>
		</div>
	</div>

	<CreateSessionDialog bind:dialog type="create" />
{/if}
