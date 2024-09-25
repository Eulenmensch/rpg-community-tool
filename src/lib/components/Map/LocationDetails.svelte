<script lang="ts">
	import { createDefaultPlayable } from '$lib/helpers';
	import type { IPlayable } from '$lib/Interfaces';
	import { mapState } from '$lib/store/mapStore';
	import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RichTextPreview from '../RichText/RichTextPreview.svelte';
	export let playable: IPlayable;

	function handleBackToList() {
		$mapState.currentView = 'List';
		$mapState.selectedPlayable = createDefaultPlayable();
	}
	function handleEdit() {
		$mapState.currentView = 'Edit';
		$mapState.selectedPlayable = playable;
	}
</script>

<div class="flex flex-col">
	<div
		class="text-center text-xl font-black p-4 bg-dark rounded-lg flex items-center gap-4 justify-center relative"
	>
		<span class="flex-grow mx-8">{playable?.name}</span>
	</div>
	<div class="flex flex-col gap-2 mt-1 mb-6">
		<button
			on:click={handleBackToList}
			class="border border-white w-full whitespace-nowrap text-white py-1.5 rounded-lg flex items-center px-2 gap-4 justify-center hover:bg-white hover:text-primary"
		>
			<Fa icon={faChevronLeft} />
			<span>Back to List</span>
		</button>
		<button
			on:click={handleEdit}
			class="border border-primary w-full whitespace-nowrap text-primary py-1.5 rounded-lg flex items-center px-2 gap-4 justify-center hover:bg-primary hover:text-white"
		>
			<Fa icon={faEdit} />
			<span>Edit Location</span>
		</button>
	</div>

	<div class="bg-dark p-4 rounded">
		<RichTextPreview content={playable?.description} />
	</div>
</div>
