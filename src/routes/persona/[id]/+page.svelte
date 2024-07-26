<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';
	import { personaHandlers } from '$lib/store/personaStore';
	import { authStore } from '$lib/store/authStore';
	import RichTextPreview from '$lib/components/RichText/RichTextPreview.svelte';

	let character: IPersona | null = null;

	let isOwnCharacter = false;

	onMount(() => {
		getPersonaData();
	});

	async function getPersonaData() {
		const id = $page.params.id;
		let userData = $authStore.data;

		let campaignId = $authStore.data?.active_campaign;

		if (!campaignId) return;
		character = await personaHandlers.getPersonaById(campaignId, id);
		isOwnCharacter = character?.userId === userData.uid;
	}
</script>

<section class="px-20 py-12">
	{#if isOwnCharacter}
		<div class="py-5 flex items-center">
			<button class="bg-primary px-3 py-2 text-white rounded ml-auto">Edit Profile</button>
		</div>{/if}

	<div class="flex">
		<div class="flex flex-col w-full">
			<div class="flex flex-row w-full border divide-x items-center">
				<h1 class="text-4xl w-2/3 px-4 py-6">{character?.name}</h1>
				<div class="divide-y w-1/3">
					<p class="w-full px-4 py-6 text-xl">No status yet</p>
					<p class="w-full px-4 py-6 text-xl">Level: {character?.level}</p>
					<p class="w-full px-4 py-6 text-xl">{character?.characterClass}</p>
				</div>
			</div>
			<div class="p-4 border">
				<RichTextPreview content={character?.about} />
			</div>
		</div>
		<div class="bg-yellow-200 w-96">Placeholder Picture</div>
	</div>
</section>
