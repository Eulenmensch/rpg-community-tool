<script lang="ts">
	import { iconStore } from '$lib/store/iconStore';
	import type { IPlayable } from '../../../Interfaces';

	export let playables: IPlayable[];
	export let handleSelectLocation: (playable: IPlayable) => void;
</script>

<div class="flex flex-col gap-6">
	<div class="text-center text-xl font-black p-4 bg-dark rounded-lg">Locations</div>
	{#if playables}
		<div class="flex flex-col gap-2 w-full">
			{#each playables as playable}
				<button
					on:click={() => handleSelectLocation(playable)}
					class="flex p-2 bg-dark rounded-lg items-center hover:bg-primary-900 gap-2"
				>
					<div class="icons-in-side" style="color:{playable.color ?? 'black'};">
						{@html $iconStore[playable.iconType ?? 'default']}
					</div>
					<span class="">{playable.name}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Style svg inside our SidePanel */
	.icons-in-side :global(svg) {
		width: 2.3rem;
		height: 2.3rem;
	}
</style>
