<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';

	let open = false;
	let personas: IPersona[] = [];
	let userData = $authStore.data;
	onMount(getPersonas);

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData) return;
		personas = await personaHandlers.getAllPersonasForUser(userData.uid);
	}

	async function switchActivePersona(personaId: string) {
		let userData = $authStore.data;
		personaHandlers.switchActivePersona(userData.uid, personaId);
	}
</script>

<div class="relative w-40 bg-red-200">
	<button on:click={() => (open = !open)}>{userData?.active_persona?.name}</button>
	<ol class={`absolute flex flex-col bg-blue-200 ${open ? 'flex' : 'hidden'}`}>
		{#each personas as persona}
			<li class="p-1 hover:bg-blue-300">
				<button on:click={() => switchActivePersona(persona.id)}>{persona.name}</button>
			</li>
		{/each}
	</ol>
</div>
