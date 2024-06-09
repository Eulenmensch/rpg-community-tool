<script lang="ts">
	import { goto } from '$app/navigation';
	import { switchActivePersona } from '$lib/helpers';
	import { authHandlers, authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { flyAndScale } from '$lib/utils';
	import { faCheck, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
	import { DropdownMenu } from 'bits-ui';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	onMount(getPersonas);

	async function getPersonas() {
		let userData = $authStore.data;
		if (!userData) return;
		$authStore.data.personas = await personaHandlers.getAllPersonasForUser(userData.uid);
	}

	async function logout() {
		authHandlers.logout();

		authStore.update((curr) => ({
			...curr,
			loading: false,
			user: null,
		}));
	}

	$: playersInCampaign = $authStore?.data?.personas?.filter(
		(p) => p.campaignId == $authStore.data.active_campaign,
	);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="bg-primary hover:bg-primary/80 size-10 rounded-full flex items-center justify-center"
	>
		<Fa class="" icon={faUser} />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		transition={flyAndScale}
		class="absolute left-0 bg-black py-2 px-4 right-0 mt-6 rounded z-40 max-w-xs text-white"
	>
		<div class="flex flex-col divide-y">
			<div>
				<p class="uppercase text-xs font-semibold text-white/60 py-1">My Characters in Campaign</p>
				<div class="max-h-48 overflow-y-auto">
					{#each playersInCampaign as persona}
						<DropdownMenu.Item
							class="data-[highlighted]:bg-primary/50 text-left flex cursor-pointer my-1 rounded p-1"
							on:click={() => switchActivePersona(persona)}
						>
							<div class="text-left flex items-center w-full">
								<span class="whitespace-nowrap text-ellipsis overflow-hidden">{persona.name}</span>
								{#if $authStore.data.active_persona?.id == persona?.id}
									<Fa class="ml-auto px-2 " icon={faCheck} />
								{/if}
							</div>
						</DropdownMenu.Item>
					{/each}
				</div>
				<DropdownMenu.Item
					class="data-[highlighted]:bg-primary/50 my-1"
					on:click={() => goto('/character/create')}
				>
					<div
						class="flex gap-4 px-3 py-1 items-center hover:bg-primary/50 w-full rounded opacity-70 cursor-pointer mb-2"
					>
						<Fa icon={faPlus} />
						<span>New Character</span>
					</div>
				</DropdownMenu.Item>
			</div>

			<DropdownMenu.Item on:click={() => goto('/campaign')} class="py-2 cursor-pointer">
				<div class="py-1 px-2 hover:bg-primary/50 rounded data-[highlighted]:bg-primary/50">
					Change Campaign
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={logout} class="py-2 flex w-full cursor-pointer">
				<div
					class=" text-white px-2 rounded-sm w-full flex items-center gap-4 py-1 hover:bg-primary/50"
				>
					<Fa icon={faRightFromBracket} />
					<span>Logout</span>
				</div>
			</DropdownMenu.Item>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
