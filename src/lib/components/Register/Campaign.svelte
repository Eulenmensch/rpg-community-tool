<script lang="ts">
	import firstCampaignImage from '$lib/images/campaign_une.png';
	import secondCampaignImage from '$lib/images/campaign_theUnknown.png';
	import { goto } from '$app/navigation';
	import { campaignHandlers } from '$lib/controller/campaignController';
	import { authStore } from '$lib/store/authStore';

	let join = false;
	let usePreset = true;
	let campaignName = '';
	let substep = 2;


	async function createCampaignForUser(name : string) {

		authStore.subscribe(async user => {
			if(!user) return
			await campaignHandlers.createCampaign(user.data.uid , name)
			goto('/');
		})

			
	}
</script>

{#if substep == 1}
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

		<div class="">
			<input type="number" class="border-gray-300 py-2 border" />
			<button class="bg-primary text-white px-6 rounded-sm h-full ml-1">Join</button>
		</div>
	{/if}
	{#if !join}
		<div class="flex flex-col text-center mt-8 mb-20 items-center">
			<h1 class="text-2xl font-bold mb-2">Name your Campaign</h1>
			<input class="border border-gray-300 py-2 mt-2" bind:value={campaignName} />
						<button
				on:click={() => (substep = 2)}
				class="bg-primary rounded-sm text-white mt-2 w-max px-4 py-2">Continue</button
			>
		</div>
	{/if}
{/if}

{#if substep == 2}
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
				<button on:click={() => createCampaignForUser("Une")} class="bg-primary text-white py-2 px-4 mx-auto mt-4 hover:bg-primary-400"
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
					on:click={() => createCampaignForUser("The unknown")}
					class="bg-primary text-white py-2 px-4 mx-auto mt-4 hover:bg-primary-400"
				>
					Get Started
				</button>
			</div>
		</div>
	{/if}
{/if}
