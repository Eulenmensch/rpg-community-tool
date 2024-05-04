<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { ICampaign } from '../../../Interfaces';
	import type { IAuthData } from '$lib/store/authStore';

	export let activeCampaignId: undefined | string = undefined;
	export let campaignStore:
		| undefined
		| Writable<{
				campaigns: ICampaign[];
				selectedCampaign: string | null;
				campaign: ICampaign | null;
		  }> = undefined;
	export let authStore: undefined | Writable<IAuthData> = undefined;
</script>

<div class="text-left">
	<h3 class="font-bold text-primary mb-2">Debug Information</h3>
	<ol class="flex flex-col gap-2">
		<li>activeCampaignId: {activeCampaignId}</li>
		<li class="">
			<p class="">CampaignStore</p>
			<ol class="">
				<li>name: {$campaignStore?.campaign?.name}</li>
				<li>owner_id: {$campaignStore?.campaign?.owner_id}</li>
			</ol>
		</li>
		<li class="">
			<p class="">AuthStore</p>
			<ol class="">
				<li>
					<p>active_persona:</p>
					<ol>
						<li>
							Id: {$authStore?.data?.active_persona?.id}
						</li>
					</ol>
				</li>
			</ol>
		</li>
	</ol>
</div>

<style>
	ol {
		margin-left: 40px;
	}
</style>
