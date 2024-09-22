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
		<button
			on:click={handleBackToList}
			class="absolute left-4 hover:bg-primary-900 size-8 flex items-center justify-center rounded"
		>
			<Fa icon={faChevronLeft} />
		</button>
		<span class="flex-grow mx-8">{playable?.name}</span>
	</div>
	<button
		on:click={handleEdit}
		class="border border-primary text-primary py-2 rounded-lg mt-2 mb-6 flex items-center px-2 gap-4 justify-center hover:bg-primary hover:text-white"
	>
		<Fa icon={faEdit} />
		<span>Edit Location</span>
	</button>
	<div class="bg-dark p-4 rounded">
		<RichTextPreview content={playable?.description} />
	</div>
</div>
