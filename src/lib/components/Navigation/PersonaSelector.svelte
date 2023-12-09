<script lang="ts">
	import { authHandlers, authStore } from '$lib/store/authStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { onMount } from 'svelte';
	import type { IPersona } from '../../../Interfaces';
	import Fa from 'svelte-fa';
	import { faCheck, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
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

<div class="relative rounded-sm">
	<button
		class="bg-primary hover:bg-primary/80 w-9 h-9 rounded-full flex items-center justify-center"
		on:click={() => (open = !open)}
	>
		<Fa class="" icon={faUser} />
	</button>

	{#if open}
		<div class="fixed bg-black py-2 px-4 right-0 mt-2 rounded-bl-lg">
			<div class="flex flex-col divide-y">
				<ol class="py-2 gap-0.5 flex flex-col">
					{#each personas as persona}
						<li class="p-1 hover:bg-primary/50 text-left flex rounded">
							<button
								class="text-left flex items-center w-full"
								on:click={() => switchActivePersona(persona?.id)}
							>
								<span>{persona.name}</span>
								{#if $authStore.data.active_persona?.id == persona?.id}
									<Fa class="ml-auto" icon={faCheck} />
								{/if}
							</button>
						</li>
					{/each}
					<li>
						<button
							on:click={() => goto('/character/create')}
							class="flex gap-4 px-2 py-1 items-center hover:bg-primary/50 w-full rounded opacity-70"
						>
							<Fa icon={faPlus} />
							<span>New</span>
						</button>
					</li>
				</ol>
				<div class="py-2">
					<button on:click={() => goto('/campaign')} class="py-1 px-2 hover:bg-primary/50 rounded">
						Change Campaign
					</button>
				</div>
				<div class="py-2 flex w-full">
					<button
						class=" text-white px-2 rounded-sm w-full flex items-center gap-4 py-1 hover:bg-primary/50"
						on:click={() => authHandlers.logout()}
					>
						<Fa icon={faRightFromBracket} />
						<span>Logout</span>
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
