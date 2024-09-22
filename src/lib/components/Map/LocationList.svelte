<script lang="ts">
	import type { IPlayable } from '$lib/Interfaces';
	import { iconStore } from '$lib/store/iconStore';
	import { mapState } from '$lib/store/mapStore';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let handleSelectLocation: (playable: IPlayable) => void;

	function handleEdit(playable: IPlayable) {
		$mapState.currentView = 'Edit';
		$mapState.selectedPlayable = playable;
	}
</script>

<div class="flex flex-col gap-6">
	<div class="text-center text-xl font-black p-4 bg-dark rounded-lg">Locations</div>
	{#if $mapState.visiblePlayables}
		<div class="flex flex-col gap-2 w-full overflow-y-auto list-container">
			{#each $mapState.visiblePlayables as playable}
				<button
					on:click={() => handleSelectLocation(playable)}
					class="flex p-2 bg-dark rounded-lg items-center hover:bg-primary-900 gap-2"
				>
					<div class="icons-in-side" style="color:{playable.color ?? 'black'};">
						{@html $iconStore[playable.iconType ?? 'default']}
					</div>
					<span class="">{playable.name}</span>
					<button
						on:click|preventDefault={() => handleEdit(playable)}
						class="ml-auto p-2.5 flex items-center justify-center rounded hover:bg-primary"
					>
						<Fa class="text-base" icon={faEdit} />
					</button>
				</button>
			{/each}
			{#if $mapState.visiblePlayables.length == 0}
				<div class="bg-dark p-4 text-center rounded text-white/70">
					There are no locations in this area yet.
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Style svg inside our SidePanel */
	.icons-in-side :global(svg) {
		width: 2.3rem;
		height: 2.3rem;
	}
	.list-container {
		max-height: calc(100vh - 140px); /* Equals header height */
	}
</style>
