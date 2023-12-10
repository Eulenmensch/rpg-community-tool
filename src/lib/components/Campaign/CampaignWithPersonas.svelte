<script lang="ts">
	import Fa from 'svelte-fa';
	import type { ICampaign, IPersona } from '../../../Interfaces';
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import { faCheck, faCircle, faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { authStore } from '$lib/store/authStore';
	import { goto } from '$app/navigation';
	import { personaHandlers } from '$lib/store/personaStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';

	export let campaign: ICampaign;
	export let personasInCampaign: IPersona[];

	//TODO: Unify with PersonaSelector
	async function switchActivePersona(persona: IPersona) {
		if (!persona?.id) return;
		let userData = $authStore.data;
		personaHandlers.switchActivePersona(userData.uid, persona?.id);
		$authStore.data.active_persona = persona;
		getSessions(persona);
	}

	async function getSessions(persona: IPersona) {
		if (!persona?.campaignId) return;
		const retrievedSessions = await sessionHandlers.getSessionsByCampaign(persona?.campaignId);
		sessionStore.set(retrievedSessions);
	}
</script>

<Disclosure class="flex flex-col">
	<DisclosureButton class="flex py-4 px-7 bg-black text-white rounded-xl z-20 items-center gap-7">
		{#if personasInCampaign?.some((pIC) => pIC.id == $authStore.data.active_persona?.id)}
			<Fa icon={faCircleCheck} class="text-xl text-green-300" />
		{:else}
			<Fa icon={faCircle} class="text-xl text-primary" />
		{/if}

		<span>{campaign.name}</span>
		<div class="ml-auto">{personasInCampaign?.length}</div>
	</DisclosureButton>
	<DisclosurePanel class="bg-gray-200 px-5 -mt-2 z-10 pt-6 pb-4 rounded-b-xl">
		<ol class="flex flex-col">
			{#each personasInCampaign as persona}
				<li class="py-2 hover:bg-primary/80 rounded px-2">
					<button
						class="flex items-center gap-3 w-full"
						on:click={() => switchActivePersona(persona)}
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
			on:click={() => goto(`/character/create?campaignId=${campaign?.id}`)}
			class="flex gap-4 px-2 py-1 items-center hover:bg-primary/80 w-full rounded opacity-70 mt-2"
		>
			<Fa icon={faPlus} />
			<span>New</span>
		</button>
	</DisclosurePanel>
</Disclosure>
