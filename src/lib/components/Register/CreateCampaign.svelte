<script lang="ts">
	import { goto } from '$app/navigation';
	import firstCampaignImage from '$lib/images/campaign_une.png';
	import secondCampaignImage from '$lib/images/campaign_theUnknown.png';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { authStore } from '$lib/store/authStore';
	import Alert from '$lib/components/Alert.svelte';

	let join = true;
	let usePreset = true;
	let campaignName = '';
	let subStep = 1;
	let joinCode = '';
	let showErrorMessage = false;
	let showSuccessMessage = false;

	async function handleJoinCampaign() {
		let userData = $authStore.data;

		if (!joinCode || !userData.uid) return;
		const campaignData = await campaignHandlers.joinCampaignWithoutPersona(joinCode, userData.uid);

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
				},
			}));
			goto('/');
		} else {
			showErrorMessage = true;
			setTimeout(() => (showErrorMessage = false), 2000);
		}
		$authStore.data.active_persona = null;
	}

	async function createCampaignForUser(type: 'Une' | 'TheUnknown') {
		const unsubscribe = authStore.subscribe(async (user) => {
			if (!user) return;
			const newCampaign = await campaignHandlers.createCampaign(user.data.uid, type, campaignName);
			campaignStore.update((curr) => ({
				campaigns: [...curr.campaigns, newCampaign],
				selectedCampaign: newCampaign.id ? newCampaign.id : null,
			}));
			authStore.update((curr) => ({
				...curr,
				data: {
					...curr.data,
					active_campaign: newCampaign.id ? newCampaign.id : null,
				},
			}));
			goto('/');
		});
		unsubscribe();
		$authStore.data.active_persona = null;
	}
</script>

{#if subStep == 1}
	<div class="flex bg-gray-200 rounded-full">
		<button
			on:click={() => {
				join = !join;
			}}
			class={`px-8 transition-all py-4 rounded-full ${
				join ? 'bg-primary text-white' : 'bg-gray-200'
			}`}
		>
			Join a Campaign
		</button>
		<button
			on:click={() => {
				join = !join;
			}}
			class={`px-8 transition-all py-4 rounded-full ${
				!join ? 'bg-primary text-white' : 'bg-gray-200'
			}`}
		>
			Create a Campaign
		</button>
	</div>

	{#if join}
		<div class="flex flex-col text-center mt-8 mb-20">
			<h1 class="text-2xl font-bold mb-2">Enter Campaign Code</h1>
			<p class="opacity-70">
				Whoever invited you should have given you a code for the campaign. <br /> Now is the time to
				use it!
			</p>
		</div>

		<form on:submit={handleJoinCampaign} class="">
			<input bind:value={joinCode} class="border-gray-300 py-2 border" />
			<button type="submit" class="bg-primary text-white px-6 rounded-sm h-full ml-1">Join</button>
		</form>
	{/if}
	{#if !join}
		<form
			on:submit|preventDefault={() => (subStep = 2)}
			class="flex flex-col text-center mt-8 mb-20 items-center"
		>
			<h1 class="text-2xl font-bold mb-2">Name your Campaign</h1>
			<input class="border border-gray-300 py-2 mt-2" bind:value={campaignName} />
			<button type="submit" class="bg-primary rounded-sm text-white mt-2 w-max px-4 py-2"
				>Continue</button
			>
		</form>
	{/if}
{/if}

{#if subStep == 2}
	<div class="flex bg-gray-200 rounded-full">
		<button
			on:click={() => {
				usePreset = !usePreset;
			}}
			class={`px-8 transition-all py-4 rounded-full ${
				usePreset ? 'bg-primary text-white' : 'bg-gray-200'
			}`}
		>
			Use one of our presets
		</button>
		<button
			on:click={() => {
				usePreset = !usePreset;
			}}
			class={`px-8 transition-all py-4 rounded-full ${
				!usePreset ? 'bg-primary text-white' : 'bg-gray-200'
			}`}
		>
			Upload your own map
		</button>
	</div>

	{#if usePreset}
		<div class="flex gap-10 mt-12">
			<div
				class="bg-gray-100 p-6 rounded-lg w-72 flex flex-col border border-gray-200 hover:border-primary"
			>
				<h2 class="text-center pb-4 text-xl font-bold">Une</h2>
				<img
					alt="Overview of the map from the une campaign"
					src={firstCampaignImage}
					class="rounded-xl"
				/>
				<p class="text-base py-2 px-0.5">
					A sprawling continent for adventurers that want to impact a civilized world.
				</p>
				<button
					on:click={() => createCampaignForUser('Une')}
					class="bg-primary text-white py-2 px-4 mx-auto mt-4 hover:bg-primary-400"
					>Get Started</button
				>
			</div>
			<div
				class="bg-gray-100 p-6 rounded-lg w-72 flex flex-col border border-gray-200 hover:border-primary"
			>
				<h2 class="text-center pb-4 text-xl font-bold">The unknown</h2>
				<img
					alt="Overview of the map from the unknown campaign"
					src={secondCampaignImage}
					class="rounded-xl"
				/>
				<p class="text-base py-2 px-0.5">
					A sprawling continent for adventurers that want to impact a civilized world.
				</p>
				<button
					on:click={() => createCampaignForUser('TheUnknown')}
					class="bg-primary text-white py-2 px-4 mx-auto mt-4 hover:bg-primary-400"
				>
					Get Started
				</button>
			</div>
		</div>
	{/if}
{/if}

<div>
	<Alert showAlert={showErrorMessage} text="You got the wrong code mate" color="bg-red-500" />
	<Alert showAlert={showSuccessMessage} text="Successfully joined" color="bg-green-500" />
</div>
