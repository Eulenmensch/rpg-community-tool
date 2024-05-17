<script lang="ts">
	import arrow from '$lib/images/Arrow.svg';
	import { authStore } from '$lib/store/authStore';
	import { campaignHandlers, campaignStore } from '$lib/store/campaignStore';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { IPlayable, PlayableType } from '../../../Interfaces';

	export let addingNewMarkerOpen: boolean;
	export let editPanelOpen: boolean;
	export let marker: L.Marker;
	let playableName = '';
	let playableDescription = '';
	let playableType: PlayableType = 'mission';
	$: activePersonaIsGM = $campaignStore?.campaign?.owner_id === $authStore?.data?.uid;

	$: _authstore = $authStore;

	function handleConfirm() {
		const coordinates = marker.getLatLng();
		const newPlayable: IPlayable = {
			name: playableName,
			description: playableDescription,
			type: playableType,
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
	<div class="fixed right-0 top-0 bottom-0 border-l bg-white shadow w-72 z-[100000] text-center">
		<div class="flex flex-col w-full p-2 py-4 gap-3">
			<div class="flex w-full flex-col">
				<input bind:value={playableName} name="name" placeholder="Playbale name" />
				<input
					bind:value={playableDescription}
					name="description"
					placeholder="Playable description"
				/>
			</div>
			<div class="flex w-full flex-col gap-0.5">
				<p class="text-left text-sm font-semibold">Type of playable</p>
				<div class="flex w-full">
					<button
						on:click={() => (playableType = 'mission')}
						class={`w-full rounded-l border py-1 ${
							playableType == 'mission' ? 'bg-primary-500/25 text-primary-600 border-primary' : ''
						}`}>Mission</button
					>
					<button
						on:click={() => (playableType = 'rumor')}
						class={`w-full rounded-r border py-1 ${
							playableType == 'rumor' ? 'bg-primary-500/25 text-primary-600 border-primary' : ''
						}`}>Rumor</button
					>
				</div>
			</div>
			<div class="flex gap-1">
				<button on:click={handleCancel} class="bg-red-500 p-2">Cancel</button>
				<button on:click={handleConfirm} class="bg-green-500 p-2">Confirm</button>
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
