<script lang="ts">
	import { createDefaultPlayable } from '$lib/helpers';
	import type { IPlayable } from '$lib/Interfaces';
	import { mapState } from '$lib/store/mapStore';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import LocationCreate from './LocationCreate.svelte';
	import LocationDetails from './LocationDetails.svelte';
	import LocationList from './LocationList.svelte';

	export let updateMarkerOnMap;
	export let marker;
	export let handleSelectLocation: (playable: IPlayable) => void;

	function handleBackToList() {
		$mapState.currentView = 'List';
		$mapState.selectedPlayable = createDefaultPlayable();
	}
</script>

<button
	on:click={() => ($mapState.sidePanelOpen = !$mapState?.sidePanelOpen)}
	class="absolute hover:bg-primary-800 right-4 bg-dark text-white top-24 size-10 items-center flex justify-center rounded cursor-pointer {$mapState?.sidePanelOpen &&
		'hidden'}"
>
	<Fa icon={faChevronLeft} class="text-white text-xl" />
</button>
{#if $mapState?.sidePanelOpen}
	<div
		style="width: {$mapState.currentView == 'Edit' ? '33' : '25'}%;"
		class="absolute bottom-0 right-0 p-6 top-0 w-1/3 bg-black bg-opacity-85 text-white z-[9999999999]"
		transition:slide={{ duration: 500, axis: 'x' }}
	>
		<button
			on:click={() => ($mapState.sidePanelOpen = !$mapState?.sidePanelOpen)}
			class="absolute -left-5 bg-dark text-white top-24 size-10 items-center flex justify-center rounded cursor-pointer z-[99999] hover:bg-primary-800"
		>
			<Fa icon={faChevronRight} class="text-white text-xl" />
		</button>
		{#if $mapState.currentView == 'Details'}
			<LocationDetails {handleBackToList} playable={$mapState.selectedPlayable} />
		{/if}
		{#if $mapState.currentView == 'List'}
			<LocationList {handleSelectLocation} />
		{/if}
		{#if $mapState.currentView == 'Edit' && $mapState.selectedPlayable}
			<LocationCreate {marker} {updateMarkerOnMap} {handleBackToList} />
		{/if}
	</div>
{/if}
