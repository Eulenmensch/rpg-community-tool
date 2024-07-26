<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';
	import { personaHandlers } from '$lib/store/personaStore';
	import { authStore } from '$lib/store/authStore';

	let character: IPersona | null = null;

	onMount(getPersonaData);

	async function getPersonaData() {
		const id = $page.params.id;
		let userData = $authStore.data;
		if (!userData) return;
		character = await personaHandlers.getPersonaById(userData?.uid, id);
	}

	const id = $page.params.id;
</script>

<div class="px-20 py-20 flex">
	<div class="flex flex-col w-full">
		<div class="flex flex-row w-full border divide-x items-center">
			<h1 class="text-4xl w-2/3 px-4 py-6">{character?.name}</h1>
			<div class="divide-y w-1/3">
				<p class="w-full px-4 py-6 text-xl">No status yet</p>
				<p class="w-full px-4 py-6 text-xl">Level: {character?.level}</p>
				<p class="w-full px-4 py-6 text-xl">{character?.characterClass}</p>
			</div>
		</div>
		<p class="bg-red-200 w-full">{character?.about}</p>
	</div>
	<div class="bg-yellow-200 w-96">Placeholder Picture</div>
</div>
