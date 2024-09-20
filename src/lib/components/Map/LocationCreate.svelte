<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import type { IPlayable } from '../../../Interfaces';
	import RichTextEditor from '../RichText/RichTextEditor.svelte';
	import IconRow from './MarkerEditor/IconRow.svelte';

	// --- Props ---
	export let marker: L.Marker;
	export let playable: IPlayable;
	export let updateMarkerOnMap: (playable: IPlayable) => void;
	export let handleBackToList: () => void;

	// --- Local Variables ---
	let colors = ['#FFF', '#000000', '#95DBD7', '#D46DB2', '#B4CE4C', '#CB9223'];

	$: updateMarkerOnMap(playable);

	function handleSubmit() {
		if (!$authStore.data.active_campaign) return;

		campaignHandlers.createPlayable(playable, $authStore.data.active_campaign);
		campaignStore.update((store) => {
			const campaign = store.campaigns.find((c) => c.id == $authStore.data.active_campaign);
			if (campaign) {
				campaign.playables = [...campaign.playables, playable];
			}
			return store;
		});
		handleBackToList();
	}

	function handleCancel() {
		marker.remove();
		handleBackToList();
	}
</script>

<div class="flex flex-col w-full p-2 py-4 gap-3">
	<form on:submit={handleSubmit} class="flex w-full flex-col gap-8">
		<div class="flex flex-col text-left mx-auto">
			<IconRow bind:selectedIconType={playable.iconType} bind:currentColor={playable.color} />
		</div>
		<div class="flex flex-col gap-2 text-left mt-2">
			<div class="flex gap-1 mx-auto">
				{#each colors as color}
					<button
						type="button"
						on:click={() => (playable.color = color)}
						class="rounded p-2 {playable.color == color
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
				bind:value={playable.name}
				required
				name="name"
				placeholder="Name of the location"
				class="border py-2 px-4 rounded-xl text-black"
			/>
		</div>

		<div class="text-left flex flex-col gap-2 text-black">
			<span class="font-black text-lg text-white">Description</span>
			<RichTextEditor
				bind:content={playable.description}
				on:update={(e) => (playable.description = e.detail)}
			/>
		</div>
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
