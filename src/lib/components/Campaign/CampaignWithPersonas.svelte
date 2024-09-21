<script lang="ts">
	import { goto } from '$app/navigation';
	import { switchActivePersona } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import {
		faCheck,
		faCircle,
		faCircleCheck,
		faCopy,
		faPlus,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ICampaign, IPersona } from '$lib/Interfaces';

	export let campaign: ICampaign;
	export let personasInCampaign: IPersona[] = [];

	function copyToClipboard(textToCopy: string | null | undefined) {
		if (!textToCopy) return;
		navigator?.clipboard?.writeText(textToCopy);
	}
</script>

<div class="flex flex-col">
	<button class="flex py-4 px-3 md:px-7 bg-black text-white rounded-xl z-20 items-center gap-7">
		{#if personasInCampaign?.some((pIC) => pIC.id == $authStore.data.active_persona?.id)}
			<Fa icon={faCircleCheck} class="text-xl text-green-300" />
		{:else}
			<Fa icon={faCircle} class="text-xl text-primary" />
		{/if}

		<div class="flex flex-col text-left gap-1">
			<span class="font-semibold text-lg">{campaign.name}</span>

			<div class="flex items-center gap-2.5">
				<span class="text-xs opacity-80">ID: {campaign.id}</span>
				<button
					on:click|stopPropagation={() => copyToClipboard(campaign?.id)}
					class="w-6 h-6 items-center justify-center flex rounded-sm hover:bg-slate-200 hover:text-primary opacity-80 hover:opacity-100"
				>
					<Fa icon={faCopy} />
				</button>
			</div>
		</div>
		<div class="ml-auto">{personasInCampaign?.length}</div>
	</button>
	<div class="bg-gray-200 px-5 -mt-2 z-10 pt-6 pb-4 rounded-b-xl">
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
	</div>
</div>
