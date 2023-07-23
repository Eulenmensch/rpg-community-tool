<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import type { IPlayable } from '../../../Interfaces';

	export let addingNewMarkerOpen: boolean;
	export let editPanelOpen: boolean;
	export let marker: L.Marker;

	$: _authstore = $authStore;

	function handleConfirm() {
		const coordinates = marker.getLatLng();
		const newPlayable: IPlayable = {
			name: 'My test name',
			description: 'My test description',
			type: 'rumor',
			coordinates: {
				lat: coordinates.lat,
				long: coordinates.lng,
			},
		};
		if (_authstore.data.active_campaign) {
			campaignHandlers.createPlayable(newPlayable, _authstore.data.active_campaign);
			editPanelOpen = false;
		}
	}

	function handleCancel() {
		marker.remove();
		editPanelOpen = false;
	}
</script>

<div class="fixed bottom-0 left-0 bg-red-500 z-[1000000]">
	<button class="py-4 px-8" on:click={() => (addingNewMarkerOpen = !addingNewMarkerOpen)}
		>Add Marker</button
	>
</div>

{#if addingNewMarkerOpen}
	<div
		class="fixed top-20 left-1/2 -translate-x-1/2 text-lg bg-slate-500 text-white z-[10000] p-6 rounded shadow"
	>
		Click anywhere on the map to add the marker
	</div>
{/if}
{#if editPanelOpen}
	<div class="fixed right-0 top-0 bottom-0 bg-red-200 w-72 z-[100000] text-center">
		<div class="flex flex-col">
			<input name="name" placeholder="Name" />
			<input name="description" placeholder="Description" />
			<div class="flex gap-1">
				<button on:click={handleCancel} class="bg-red-500 p-2">Cancel</button>
				<button on:click={handleConfirm} class="bg-green-500 p-2">Confirm</button>
			</div>
		</div>
	</div>
{/if}
