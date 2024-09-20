<script lang="ts">
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import type { IPlayable, View } from '../../../Interfaces';
	import LocationList from './LocationList.svelte';
	import LocationDetails from './LocationDetails.svelte';
	import LocationCreate from './LocationCreate.svelte';

	export let visiblePlayables: IPlayable[];
	export let sidePanelOpen: boolean;
	export let selectedPlayable: IPlayable | null;
	export let currentView: View;
	export let newPlayable: IPlayable;
	export let updateMarkerOnMap;
	export let marker;
	export let map: L.Map;

	function handleSelectLocation(playable: IPlayable) {
		currentView = 'Details';
		selectedPlayable = playable;
		map.setView([playable.coordinates.lat, playable.coordinates.long], map.getZoom());
	}

	function handleBackToList() {
		currentView = 'List';
		selectedPlayable = null;
	}
</script>

<button
	on:click={() => (sidePanelOpen = !sidePanelOpen)}
	class="absolute hover:bg-primary-800 right-4 bg-dark text-white top-24 size-10 items-center flex justify-center rounded cursor-pointer {sidePanelOpen &&
		'hidden'}"
>
	<Fa icon={faChevronLeft} class="text-white text-xl" />
</button>
{#if sidePanelOpen}
	<div
		style="width: {currentView == 'Edit' ? '33' : '25'}%;"
		class="absolute bottom-0 right-0 p-6 top-0 w-1/3 bg-black bg-opacity-85 text-white z-[9999999999]"
		transition:slide={{ duration: 500, axis: 'x' }}
	>
		<button
			on:click={() => (sidePanelOpen = !sidePanelOpen)}
			class="absolute -left-5 bg-dark text-white top-24 size-10 items-center flex justify-center rounded cursor-pointer z-[99999] hover:bg-primary-800"
		>
			<Fa icon={faChevronRight} class="text-white text-xl" />
		</button>
		{#if currentView == 'Details'}
			<LocationDetails {handleBackToList} playable={selectedPlayable} />
		{/if}
		{#if currentView == 'List'}
			<LocationList {handleSelectLocation} {visiblePlayables} />
		{/if}
		{#if currentView == 'Edit'}
			<LocationCreate {marker} {updateMarkerOnMap} bind:playable={newPlayable} {handleBackToList} />
		{/if}
	</div>
{/if}
