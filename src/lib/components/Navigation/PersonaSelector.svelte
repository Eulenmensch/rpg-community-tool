<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';
	import Fa from 'svelte-fa';
	import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';

	let open = false;
	let personas: IPersona[] = [];
	onMount(getPersonas);

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData) return;
		personas = await personaHandlers.getAllPersonasForUser(userData.uid);
	}

	async function switchActivePersona(personaId: string | undefined) {
		if (!personaId) return;
		let userData = $authStore.data;
		personaHandlers.switchActivePersona(userData.uid, personaId);

		//TODO: Update active campaign and active persona
	}
</script>

<div class="relative bg-white text-black rounded-sm py-1 px-2">
	<button
		class="whitespace-nowrap w-full bg-red-200 flex gap-2 items-center min-w-[10rem] max-w-[15rem] overflow-hidden text-ellipsis"
		on:click={() => (open = !open)}
	>
		<span
			>{$authStore.data.active_persona?.name
				? $authStore.data.active_persona?.name
				: 'No character selected'}
		</span>
		<Fa class="ml-auto" icon={faChevronDown} />
	</button>
	<ol
		class={`absolute top-full flex flex-col mt-2 w-full bg-primary text-white text-left left-0 rounded-sm ${
			open ? 'flex' : 'hidden'
		}`}
	>
		{#each personas as persona}
			<li class="p-1 hover:bg-blue-300 text-left flex">
				<button class="text-left" on:click={() => switchActivePersona(persona?.id)}
					>{persona.name}</button
				>
			</li>
		{/each}
		<li>
			<button
				on:click={() => goto('/character/create')}
				class="flex gap-4 px-2 py-2 items-center hover:bg-slate-500 w-full rounded"
			>
				<Fa icon={faPlus} />
				<span>New</span>
			</button>
		</li>
	</ol>
</div>
