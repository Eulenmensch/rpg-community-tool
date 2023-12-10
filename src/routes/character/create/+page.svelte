<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { navHeight } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { goto } from '$app/navigation';
	import { campaignHandlers } from '$lib/store/campaignStore';
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { ICampaign, IPersona } from '../../../Interfaces';

	let activeCampaignId = $authStore.data.active_campaign;

	let campaigns: ICampaign[] = [];
	let selectedCampaign: string;
	let name = '';
	const type = 'player';
	let level = 1;
	let characterClass = '';
	let about = '';

	onMount(() => {
		getCampaigns();
	});

	async function getCampaigns() {
		campaigns = await campaignHandlers.getAllCampaignsForUser($authStore.data.uid);

		const preselectedCampaignId = $page.url.searchParams.get('campaignId');
		if (preselectedCampaignId) {
			selectedCampaign = preselectedCampaignId;
		} else {
			if (!campaigns[0]?.id) return;
			selectedCampaign = campaigns[0]?.id;
		}
	}

	async function createPersona() {
		let userData = $authStore.data;
		if (!activeCampaignId || !userData || !selectedCampaign) return;

		const persona: IPersona = {
			name: name,
			type: type,
			level: level,
			characterClass: characterClass,
			campaignId: selectedCampaign,
		};

		const newPersonaId = await personaHandlers.createPersona(userData?.uid, persona);

		authStore.update((curr) => ({
			...curr,
			data: {
				...curr.data,
				active_campaign: selectedCampaign,
				active_persona: {
					...persona,
					id: newPersonaId,
				},
				personas: [...curr.data.personas, persona],
			},
		}));
		goto('/');
	}
</script>

<section
	class="flex items-center flex-col justify-center font-inknut"
	style={`height: calc(100vh - ${navHeight})`}
>
	<form on:submit|preventDefault={createPersona} class="flex flex-col gap-6">
		<p class="text-left text-xl font-bold">Create a new character</p>
		<div class="flex flex-col">
			<label class="font-semibold mb-0.5" for="name">Name</label>
			<input
				bind:value={name}
				required
				name="name"
				placeholder="Name"
				class="border px-3 py-1.5 rounded outline-primary"
			/>
		</div>
		<div class="flex flex-col">
			<label class="font-semibold mb-0.5" for="characterClass">Class</label>
			<input
				bind:value={characterClass}
				name="characterClass"
				placeholder="Class"
				class="border px-3 py-1.5 rounded outline-primary"
			/>
		</div>
		<div class="flex flex-col">
			<label class="font-semibold mb-0.5" for="level">Campaign</label>
			<select
				bind:value={selectedCampaign}
				name="characterClass"
				placeholder="Class"
				class="border px-3 py-1 rounded outline-primary"
			>
				{#each campaigns as campaign}
					<option value={campaign.id}>{campaign.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col">
			<label class="font-semibold mb-0.5" for="level">Level</label>
			<NumberInput bind:value={level} max={20} min={1} />
		</div>
		<div class="flex flex-col">
			<label class="font-semibold mb-0.5" for="about">About</label>
			<textarea bind:value={about} name="about" class="border h-40 outline-primary p-4 text-sm" />
		</div>

		<div class="flex gap-4 ml-auto mt-12">
			<button type="reset" class="px-3 bg-gray-400 text-white rounded outline-primary">
				Cancel
			</button>
			<Button type="submit">Create</Button>
		</div>
	</form>
</section>
