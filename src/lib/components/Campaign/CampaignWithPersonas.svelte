<script lang="ts">
	import Fa from 'svelte-fa';
	import type { ICampaign, IPersona } from '../../../Interfaces';
	export let campaign: ICampaign;
	export let personasInCampaign: IPersona[];
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { authStore } from '$lib/store/authStore';
	import { goto } from '$app/navigation';
	import { personaHandlers } from '$lib/store/personaStore';

	//TODO: Unify with PersonaSelector
	async function switchActivePersona(personaId: string | undefined) {
		if (!personaId) return;
		let userData = $authStore.data;
		personaHandlers.switchActivePersona(userData.uid, personaId);
		//TODO: Update active campaign and active persona
	}
</script>

<Disclosure class="flex flex-col">
	<DisclosureButton class="flex py-4 px-7 bg-black text-white rounded-xl z-20 ">
		<span>{campaign.name}</span>
		<div class="ml-auto">{personasInCampaign?.length}</div>
	</DisclosureButton>
	<DisclosurePanel class="bg-gray-200 px-5 -mt-2 z-10 pt-6 pb-4 rounded-b-xl">
		<ol class="flex flex-col">
			{#each personasInCampaign as persona}
				<li class="py-2 hover:bg-primary/80 rounded px-2">
					<button
						class="flex items-center gap-3 w-full"
						on:click={() => switchActivePersona(persona.id)}
					>
						<span>{persona?.name}</span>
						{#if $authStore.data.active_persona?.id == persona?.id}
							<Fa class="text-primary text-lg" icon={faCheck} />
						{/if}
					</button>
				</li>
			{/each}
		</ol>
		{#if personasInCampaign?.length == 0}
			<p class="opacity-70">You do not have any characters in this campaign yet.</p>
		{/if}
		<button
			on:click={() => goto('/character/create')}
			class="flex gap-4 px-2 py-1 items-center hover:bg-primary/80 w-full rounded opacity-70 mt-2"
		>
			<Fa icon={faPlus} />
			<span>New</span>
		</button>
	</DisclosurePanel>
</Disclosure>
