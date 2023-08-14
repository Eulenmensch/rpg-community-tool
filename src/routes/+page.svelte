<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Session from '$lib/components/Session.svelte';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { onMount } from 'svelte';
	import type { ISession } from '../Interfaces';
	import { sessionHandlers } from '$lib/store/sessionStore';

	let code = '';
	let campaign = $campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign);
	let showErrorMessage = false;
	let showSuccessMessage = false;
	let sessions: ISession[] = [];

	onMount(getSessions);

	async function createCampaign() {
		let userData = $authStore.data;
		campaignHandlers.createCampaign(userData.uid, 'Une', 'My new Campaign');
	}
	async function createSession() {
		let selectedCampaign = $campaignStore.campaigns[2];
		if (!selectedCampaign.id) return;
		sessionHandlers.createSessionForCampaign(selectedCampaign.id, {
			date: '21.12.2022',
			name: 'My new Session',
			slots: 4,
			status: 'scheduled',
		});
	}
	async function getSessions() {
		let selectedCampaign = $campaignStore.campaigns[2];
		//TODO: Get by active campaign, not a random one
		if (!selectedCampaign.id) return;
		sessions = await sessionHandlers.getSessionsByCampaign(selectedCampaign.id);
	}

	async function handleJoinCampaign() {
		let userData = $authStore.data;
		const campaignData = await campaignHandlers.joinCampaign(code, userData.uid);

		if (campaignData) {
			showSuccessMessage = true;
			setTimeout(() => (showSuccessMessage = false), 2000);
			campaignStore.update((curr) => ({
				campaigns: [...curr.campaigns, campaignData],
				selectedCamapaign: campaignData.id ? campaignData.id : null,
			}));
			authStore.update((curr) => ({
				...curr,
				data: {
					...curr.data,
					active_campaign: campaignData.id ? campaignData.id : null,
				},
			}));
		} else {
			showErrorMessage = true;
			setTimeout(() => (showErrorMessage = false), 2000);
		}
	}
</script>

<div class="p-4 font-inknut">
	<div class="flex py-2 flex-col gap-4">
		<h1 class="text-lg font-semibold mb-6">Protected Landing - Dashboard page</h1>
		<div class="flex flex-col p-2 rounded bg-slate-100 w-72">
			<span class="font-semibold mb-1">{campaign?.name}</span>
			<div class="flex flex-col">
				<span>Campaign code</span>
				<span>{campaign?.code}</span>
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
			<button class="bg-red-500 p-1" on:click={createCampaign}>Create Campaign Tester</button>
		</div>
		<div>
			<button class="bg-red-500 p-1" on:click={createSession}>Create Session Tester</button>
		</div>
		<div class="flex flex-col gap-2">
			<h2>Sessions</h2>
			{#each sessions as session}
				<Session {session} />
			{/each}
		</div>
		<div>
			<Alert showAlert={showErrorMessage} text="You got the wrong code mate" color="bg-red-500" />
			<Alert showAlert={showSuccessMessage} text="Successfully joined" color="bg-green-500" />
		</div>
	</div>
</div>
