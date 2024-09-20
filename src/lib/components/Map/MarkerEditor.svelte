<script lang="ts">
	import arrow from '$lib/images/Arrow.svg';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import type { IPlayable } from '../../../Interfaces';
	import RichTextEditor from '../RichText/RichTextEditor.svelte';
	import IconRow from './MarkerEditor/IconRow.svelte';

	export let addingNewMarkerOpen: boolean;
	export let editPanelOpen: boolean;
	export let marker: L.Marker;
	export let playable: IPlayable;
	export let updateMarkerOnMap: (playable: IPlayable) => void;

	$: activePersonaIsGM = $campaignStore?.campaign?.owner_id === $authStore?.data?.uid;
	$: _authstore = $authStore;
	$: updateMarkerOnMap(playable);

	function handleConfirm() {
		if (_authstore.data.active_campaign) {
			campaignHandlers.createPlayable(playable, _authstore.data.active_campaign);
			editPanelOpen = false;
		}
	}

	function handleCancel() {
		marker.remove();
		editPanelOpen = false;
	}

	let colors = ['#000000', '#95DBD7', '#D46DB2', '#B4CE4C', '#CB9223'];
</script>

<div
	class="fixed bottom-1/2 left-5 z-[1000000] bg-white flex flex-col origin-center translate-y-1/2 image-border"
>
	<button class=" p-2 flex justify-center" on:click={() => (addingNewMarkerOpen = false)}>
		<img src={arrow} class="w-8" alt="Arrow Icon" />
	</button>
	{#if activePersonaIsGM}
		<button
			class=" p-2 items-center flex justify-center"
			on:click={() => (addingNewMarkerOpen = !addingNewMarkerOpen)}
		>
			<Fa icon={faPlus} class="text-4xl" />
		</button>
	{/if}
</div>

{#if addingNewMarkerOpen}
	<div
		class="fixed top-20 left-1/2 -translate-x-1/2 text-lg bg-slate-500 text-white z-[10000] p-6 rounded shadow"
	>
		Click anywhere on the map to add the marker
	</div>
{/if}
{#if editPanelOpen}
	<div
		transition:slide={{ duration: 500, axis: 'x' }}
		class="fixed right-0 top-0 bottom-0 bg-black bg-opacity-80 text-white shadow w-1/3 z-[100000] text-center py-4 px-4"
	>
		<div class="flex flex-col w-full p-2 py-4 gap-3">
			<div class="flex w-full flex-col gap-8">
				<div class="flex flex-col text-left mx-auto">
					<IconRow bind:selectedIconType={playable.iconType} bind:currentColor={playable.color} />
				</div>
				<div class="flex flex-col gap-2 text-left mt-2">
					<div class="flex gap-1 mx-auto">
						{#each colors as color}
							<button
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
						name="name"
						placeholder="Playbale name"
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
			</div>
			<div class="flex gap-4 absolute bottom-12 right-12">
				<button
					on:click={handleCancel}
					class="bg-gray-400 hover:bg-gray-500 p-4 py-3 rounded-lg font-boldv">Cancel</button
				>
				<button
					on:click={handleConfirm}
					class="bg-primary hover:bg-primary-600 p-4 py-3 rounded-lg font-boldv">Confirm</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.image-border {
		border: 20px solid;
		border-image-source: url('description-input-frame.svg');
		border-image-slice: 32 fill;
		border-image-repeat: round;
	}
</style>
