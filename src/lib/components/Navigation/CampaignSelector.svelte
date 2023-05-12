<script lang="ts">
	import { campaignStore } from '$lib/store/campaignStore';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ICampaign } from '../../../Interfaces';

	let open = true;

	let campaigns: ICampaign[];
	campaignStore.subscribe((data) => {
		campaigns = data.campaigns;
	});

	function switchActiveCampaign(campaignId: string) {
		console.log(campaignId);
		campaignStore.update((curr) => ({
			...curr,
			selectedCamapaign: campaignId,
		}));
	}
</script>

<!-- 
    We should use some prebuild component like HeadlessUI once we implement the styled version 
    For Keyboard accesability, clickaway etc.
-->
<div class="relative">
	<button
		on:click={() => (open = !open)}
		class="border border-white px-3 py-0.5 rounded flex items-center gap-3 text-sm"
	>
		<span>{campaigns.find((c) => c.id === $campaignStore.selectedCamapaign)?.name}</span>
		<Fa icon={faChevronDown} />
	</button>
	<div
		class={`border bg-white shadow text-black z-30 absolute w-full mt-1 ${
			open ? 'visible' : 'invisible'
		}`}
	>
		<ol>
			{#each campaigns as campaign}
				<li class="my-1.5 hover:bg-black hover:text-white">
					<button on:click={() => switchActiveCampaign(campaign.id)}>{campaign?.name}</button>
				</li>
			{/each}
		</ol>
	</div>
</div>
