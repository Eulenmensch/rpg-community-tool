<script lang="ts">
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import type { IPlayable } from '../../../Interfaces';
	import LocationList from './LocationList.svelte';
	import LocationDetails from './LocationDetails.svelte';

	export let playables: IPlayable[];
	let sidePanelOpen = false;
	type View = 'Details' | 'Edit' | 'Create' | 'List';
	let currentView: View = 'List';
	let selectedPlayable: IPlayable | null = null;

	function handleSelectLocation(playable: IPlayable) {
		currentView = 'Details';
		selectedPlayable = playable;
	}

	function handleBackToList() {
		currentView = 'List';
		selectedPlayable = null;
	}
</script>

<button
	on:click={() => (sidePanelOpen = !sidePanelOpen)}
	class="absolute right-4 bg-dark text-white top-20 size-10 items-center flex justify-center rounded cursor-pointer {sidePanelOpen &&
		'hidden'}"
>
	<Fa icon={faChevronLeft} class="text-white text-xl" />
</button>
{#if sidePanelOpen}
	<div
		class="absolute bottom-0 right-0 p-6 top-0 w-1/4 bg-black bg-opacity-80 text-white z-[9999999999]"
		transition:slide={{ duration: 500, axis: 'x' }}
	>
		<button
			on:click={() => (sidePanelOpen = !sidePanelOpen)}
			class="absolute -left-5 bg-dark text-white top-20 size-10 items-center flex justify-center rounded cursor-pointer z-[99999]"
		>
			<Fa icon={faChevronRight} class="text-white text-xl" />
		</button>
		{#if currentView == 'Details'}
			<LocationDetails {handleBackToList} playable={selectedPlayable} />
		{/if}
		{#if currentView == 'List'}
			<LocationList {handleSelectLocation} {playables} />
		{/if}
	</div>
{/if}

<style>
	/* Style svg inside our SidePanel */
	.icons-in-side :global(svg) {
		width: 2.5rem;
		height: 2.5rem;
	}
</style>
