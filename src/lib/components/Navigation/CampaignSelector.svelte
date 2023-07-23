<script lang="ts">
	import { campaignStore } from '$lib/store/campaignStore';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { IUserData } from '../../../Interfaces';
	import { authHandlers, authStore } from '$lib/store/authStore';

	let open = false;

	let userData: IUserData;
	authStore.subscribe((_userData) => {
		userData = _userData.data;
	});

	function switchActiveCampaign(campaignId: string | null | undefined) {
		if (!campaignId) return;
		authHandlers.update(userData.uid, campaignId);
		authStore.update((curr) => ({
			...curr,
			data: {
				...curr.data,
				active_campaign: campaignId,
			},
		}));
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
<div class="relative w-40">
	<button
		on:click={() => (open = !open)}
		class="border border-white px-3 py-0.5 rounded flex items-center gap-3 text-sm w-full"
	>
		<span
			>{$campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign)?.name}</span
		>
		<Fa class="ml-auto" icon={faChevronDown} />
	</button>
	<div
		class={`border bg-white shadow text-black z-50 absolute w-full mt-1 ${
			open ? 'visible' : 'invisible'
		}`}
	>
		<ol>
			{#each $campaignStore.campaigns as campaign}
				<li
					class="my-1.5 hover:bg-black w-full hover:text-white whitespace-nowrap overflow-hidden text-ellipsis"
				>
					<button on:click={() => switchActiveCampaign(campaign.id)}>{campaign?.name}</button>
				</li>
			{/each}
		</ol>
	</div>
</div>
