<script lang="ts">
	import { authHandlers, authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';
	import Fa from 'svelte-fa';
	import { faCheck, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';

	let open = false;
	onMount(getPersonas);

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData) return;
		$authStore.data.personas = await personaHandlers.getAllPersonasForUser(userData.uid);
	}

	async function switchActivePersona(persona: IPersona) {
		if (!persona?.id) return;
		let userData = $authStore.data;
		personaHandlers.switchActivePersona(userData.uid, persona?.id);
		$authStore.data.active_persona = persona;
		getSessions(persona);
		getCampaign(persona.campaignId);
	}

	async function getSessions(persona: IPersona) {
		if (!persona?.campaignId) return;
		const retrievedSessions = await sessionHandlers.getSessionsByCampaign(persona?.campaignId);
		sessionStore.set(retrievedSessions);
	}

	async function getCampaign(campaignId: string) {
		if (!campaignId) return;
		let campaign = await campaignHandlers.getCampaign(campaignId);
		$campaignStore.campaign = campaign;
	}
</script>

<Menu>
	<MenuButton
		class="bg-primary hover:bg-primary/80 w-9 h-9 rounded-full flex items-center justify-center"
		on:click={() => (open = !open)}
	>
		<Fa class="" icon={faUser} />
	</MenuButton>
	<MenuItems class="fixed bg-black py-2 px-4 right-0 mt-2 rounded-bl-lg z-40 max-w-xs">
		<div class="flex flex-col divide-y">
			<div>
				{#each $authStore?.data?.personas as persona}
					<MenuItem
						on:click={() => switchActivePersona(persona)}
						let:active
						class="text-left flex cursor-pointer my-1"
					>
						<div class="text-left flex items-center w-full p-1 rounded {active && 'bg-primary/50'}">
							<span class="whitespace-nowrap text-ellipsis overflow-hidden">{persona.name}</span>
							{#if $authStore.data.active_persona?.id == persona?.id}
								<Fa class="ml-auto px-2 " icon={faCheck} />
							{/if}
						</div>
					</MenuItem>
				{/each}
				<MenuItem let:active on:click={() => goto('/character/create')}>
					<div
						class="flex gap-4 px-3 py-1 items-center hover:bg-primary/50 w-full rounded opacity-70 cursor-pointer mb-2 {active &&
							'bg-primary/50'}"
					>
						<Fa icon={faPlus} />
						<span>New</span>
					</div>
				</MenuItem>
			</div>
			<MenuItem let:active on:click={() => goto('/campaign')} class="py-2 cursor-pointer">
				<div class="py-1 px-2 hover:bg-primary/50 rounded {active && 'bg-primary/50'}">
					Change Campaign
				</div>
			</MenuItem>
			<MenuItem
				let:active
				on:click={() => authHandlers.logout()}
				class="py-2 flex w-full cursor-pointer"
			>
				<div
					class=" text-white px-2 rounded-sm w-full flex items-center gap-4 py-1 hover:bg-primary/50 {active &&
						'bg-primary/50'}"
				>
					<Fa icon={faRightFromBracket} />
					<span>Logout</span>
				</div>
			</MenuItem>
		</div>
	</MenuItems>
</Menu>
