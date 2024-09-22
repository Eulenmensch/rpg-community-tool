<script lang="ts">
	import { createDefaultPlayable } from '$lib/helpers';
	import type { IPlayable } from '$lib/Interfaces';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { mapState } from '$lib/store/mapStore';
	import RichTextEditor from '../RichText/RichTextEditor.svelte';
	import IconRow from './MarkerEditor/IconRow.svelte';

	// --- Props ---
	export let marker: L.Marker;
	export let updateMarkerOnMap: (playable: IPlayable) => void;

	// --- Local Variables ---
	let colors = ['#FFF', '#000000', '#95DBD7', '#D46DB2', '#B4CE4C', '#CB9223'];

	$: updateMarkerOnMap($mapState.selectedPlayable);

	function handleSubmit() {
		if ($mapState.currentView == 'Create') {
			handleCreate();
		}
		if ($mapState.currentView == 'Edit') {
			handleEdit();
		}

		//$mapState.selectedPlayable = createDefaultPlayable(); // Reset state to default playable
	}

	function handleCreate() {
		if (!$authStore.data.active_campaign) return;
		if (!$campaignStore.campaign) return;
		campaignHandlers.createPlayable($mapState.selectedPlayable, $authStore.data.active_campaign);

		$campaignStore.campaign.playables = [
			...$campaignStore.campaign?.playables,
			$mapState.selectedPlayable,
		];
	}

	function handleEdit() {
		if (!$authStore.data.active_campaign) return;
		campaignHandlers.updatePlayable($mapState.selectedPlayable, $authStore.data.active_campaign);
		$mapState.currentView = 'Details';
	}

	function handleCancel() {
		if ($mapState.currentView == 'Create') {
			marker.remove();
			$mapState.selectedPlayable = createDefaultPlayable(); // Reset state to default playable;
		}
		$mapState.currentView = 'List';
	}
</script>

<div class="flex flex-col w-full p-2 py-4 gap-3">
	<form on:submit={handleSubmit} class="flex w-full flex-col gap-8">
		<div class="flex flex-col text-left mx-auto">
			<IconRow
				bind:selectedIconType={$mapState.selectedPlayable.iconType}
				bind:currentColor={$mapState.selectedPlayable.color}
			/>
		</div>
		<div class="flex flex-col gap-2 text-left mt-2">
			<div class="flex gap-1 mx-auto">
				{#each colors as color}
					<button
						type="button"
						on:click={() => ($mapState.selectedPlayable.color = color)}
						class="rounded p-2 {$mapState.selectedPlayable.color == color
							? 'bg-primary-800/50'
							: 'hover:bg-primary-800/70'}"
					>
						<div style="background-color: {color};" class="size-8 rounded-lg" />
					</button>
				{/each}
			</div>
		</div>
		<div class="flex flex-col text-left gap-1">
			<label class="text-lg font-black" for="name">Title</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				bind:value={$mapState.selectedPlayable.name}
				required
				name="name"
				placeholder="Name of the location"
				class="border py-2 px-4 rounded-xl text-black"
			/>
		</div>

		<div class="text-left flex flex-col gap-2 text-black">
			<span class="font-black text-lg text-white">Description</span>
			<RichTextEditor
				bind:content={$mapState.selectedPlayable.description}
				on:update={(e) => ($mapState.selectedPlayable.description = e.detail)}
			/>
		</div>

		{#if $mapState.currentView == 'Edit'}
			<div class="text-left flex flex-col gap-2 text-black">
				<span class="font-black text-lg text-white">Danger Area</span>
				<button
					class="border-red-500 border text-red-500 px-3 py-1 mt-1 whitespace-nowrap rounded hover:bg-red-500 hover:text-white"
					>Delete Location</button
				>
			</div>
		{/if}

		<div class="flex gap-4 absolute bottom-12 right-12">
			<button
				type="reset"
				on:click={handleCancel}
				class="bg-gray-400 hover:bg-gray-500 p-4 py-3 rounded-lg font-boldv">Cancel</button
			>
			<button type="submit" class="bg-primary hover:bg-primary-600 p-4 py-3 rounded-lg font-boldv"
				>Confirm</button
			>
		</div>
	</form>
</div>
