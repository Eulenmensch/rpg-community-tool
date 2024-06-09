<script lang="ts">
	import { campaignStore } from '$lib/store/campaignStore';
	import type { ISession } from '../../../Interfaces';
	import PlayableListItem from './PlayableListItem.svelte';

	let selectedType = 'location';

	// --- Props ---
	export let session: ISession;

	//For older DB Documents that do not have playables
	if (!session.playables) {
		session.playables = [];
	}
</script>

<div>
	<p class="text-lg font-semibold">Related Items</p>
	<div class="flex justify-between items-end">
		<div class="flex gap-1 mt-4">
			<button
				type="button"
				on:click={() => {
					selectedType = 'location';
				}}
				class="border p-2 px-4 rounded-t-lg {selectedType == 'location'
					? 'bg-primary text-white'
					: 'bg-slate-100'}">Locations</button
			>
			<button
				type="button"
				on:click={() => {
					selectedType = 'mission';
				}}
				class="border p-2 px-4 rounded-t-lg
                {selectedType == 'mission' ? 'bg-primary text-white' : 'bg-slate-100'}"
				>Missions</button
			>
			<button
				type="button"
				on:click={() => {
					selectedType = 'rumor';
				}}
				class="border p-2 px-4 rounded-t-lg {selectedType == 'rumor'
					? 'bg-primary text-white'
					: 'bg-slate-100'}">Rumors</button
			>
		</div>
		<div>
			<button
				on:click={() => {
					selectedType = 'selected';
				}}
				type="button"
				class="p-2 px-4 rounded-t-lg flex items-center gap-2 {selectedType == 'selected'
					? 'bg-primary text-white'
					: 'bg-slate-100'}"
			>
				<p>Selected</p>
				<p
					class="size-5 text-xs text-white justify-center flex rounded-full items-center font-bold {session
						?.playables?.length > 0
						? 'bg-red-500'
						: 'bg-slate-400'}"
				>
					{session?.playables?.length}
				</p>
			</button>
		</div>
	</div>

	{#if $campaignStore?.campaign?.playables}
		<div class="flex flex-col gap-2 p-8 bg-slate-200 max-h-60 overflow-y-auto">
			{#if selectedType == 'selected'}
				{#if session?.playables?.length == 0}
					<p class="text-dark/80 text-sm">
						Related items will appear here once you added them them to the session
					</p>
				{/if}

				{#each session?.playables as playable}
					<PlayableListItem {playable} bind:session />
				{/each}
			{:else}
				{#if $campaignStore?.campaign?.playables.filter((playable) => playable.type == selectedType).length == 0}
					<p class="text-dark/80 text-sm">
						Create {selectedType}s in the map before adding them to your session
					</p>
				{/if}

				{#each $campaignStore?.campaign?.playables.filter((playable) => playable.type == selectedType) as playable}
					<PlayableListItem {playable} bind:session />
				{/each}
			{/if}
		</div>
	{/if}
</div>
