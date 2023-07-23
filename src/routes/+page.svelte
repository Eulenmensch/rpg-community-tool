<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';

	let code = '';
	let campaign = $campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign);
	let showErrorMessage = false;
	let showSuccessMessage = false;

	async function handleJoinCampaign() {
		let userData = $authStore.data;
		const docSuccessfullyUpdated = await campaignHandlers.joinCampaign(code, userData.uid);

		if (docSuccessfullyUpdated) {
			showSuccessMessage = true;
			setTimeout(() => (showSuccessMessage = false), 2000);
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
			<Alert showAlert={showErrorMessage} text="You got the wrong code mate" color="bg-red-500" />
			<Alert showAlert={showSuccessMessage} text="Sucesfully joined" color="bg-green-500" />
		</div>
	</div>
</div>
