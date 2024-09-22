<script lang="ts">
	import type { IPlayable } from '$lib/Interfaces';
	import { mapState } from '$lib/store/mapStore';
	import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import LocationCreateOrEdit from './LocationCreateOrEdit.svelte';
	import LocationDetails from './LocationDetails.svelte';
	import LocationList from './LocationList.svelte';

	export let updateMarkerOnMap;
	export let marker;
	export let handleSelectLocation: (playable: IPlayable, view: 'Details' | 'Edit') => void;
</script>

<div
	style="width: {$mapState.currentView == 'Create' || $mapState.currentView == 'Edit'
		? '33'
		: '25'}%; right: {$mapState.sidePanelOpen ? '0' : '-23.5%'}"
	class="fixed bottom-0 right-0 p-6 top-0 w-1/3 bg-black bg-opacity-85 text-white z-[9999999999] transition-all duration-700 ease-in-out"
>
	<button
		on:click={() => ($mapState.sidePanelOpen = !$mapState?.sidePanelOpen)}
		class="absolute -left-6 bg-dark text-white top-8 size-10 items-center flex justify-center rounded cursor-pointer z-[99999] hover:bg-primary-800"
	>
		<Fa
			icon={faChevronLeft}
			class="text-white text-xl transition-all duration-500 ease-in-out {$mapState.sidePanelOpen
				? '-rotate-180'
				: 'rotate-0'}"
		/>
	</button>
	{#if $mapState.currentView == 'Details'}
		<LocationDetails playable={$mapState.selectedPlayable} />
	{/if}
	{#if $mapState.currentView == 'List'}
		<LocationList {handleSelectLocation} />
	{/if}
	{#if $mapState.currentView == 'Create' || ($mapState.currentView == 'Edit' && $mapState.selectedPlayable)}
		<LocationCreateOrEdit {marker} {updateMarkerOnMap} />
	{/if}
</div>
