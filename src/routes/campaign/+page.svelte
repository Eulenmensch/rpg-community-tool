<script lang="ts">
	import { goto } from '$app/navigation';
	import CampaignWithPersonas from '$lib/components/Campaign/CampaignWithPersonas.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ICampaign, IPersona } from '../../Interfaces';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers } from '$lib/store/campaignStore';
	import { personaHandlers } from '$lib/store/personaStore';

	let campaigns: ICampaign[] = [];
	let personas: IPersona[];

	onMount(getCampaigns);
	onMount(getPersonas);

	async function getCampaigns() {
		let userData = $authStore.data;
		if (!userData) return;
		campaigns = await campaignHandlers.getAllCampaignsForUser($authStore.data.uid);
	}

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData) return;
		personas = await personaHandlers.getAllPersonasForUser(userData.uid);
	}
</script>

<section class="">
	<div class="mt-20 flex">
		<div class="mx-auto w-1/3 flex flex-col gap-4">
			{#each campaigns as campaign}
				<CampaignWithPersonas
					{campaign}
					personasInCampaign={personas?.filter((p) => p.campaignId == campaign.id)}
				/>
			{/each}
			<button
				on:click={() => goto('/campaign/create')}
				class="border rounded-full p-3 border-dark mx-auto mt-10 hover:bg-primary hover:border-primary hover:text-white"
			>
				<Fa icon={faPlus} />
			</button>
		</div>
	</div>
</section>
