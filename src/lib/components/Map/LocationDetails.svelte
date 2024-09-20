<script lang="ts">
	import Fa from 'svelte-fa';
	import type { IPlayable } from '../../../Interfaces';
	import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
	import RichTextPreview from '../RichText/RichTextPreview.svelte';
	export let playable: IPlayable | null;
	export let handleBackToList: () => void;
</script>

<div class="flex flex-col gap-6">
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
	<div class="bg-dark p-4 rounded">
		<RichTextPreview content={playable?.description} />
	</div>
</div>
