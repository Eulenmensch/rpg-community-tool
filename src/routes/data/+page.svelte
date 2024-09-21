<script lang="ts">
	import { campaignStore } from '$lib/store/campaignStore';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fuse from 'fuse.js';
	import Fa from 'svelte-fa';
	import type { IPersona } from '../../lib/Interfaces';
	import Avatar from '$lib/components/Avatar.svelte';

	//TODO: Add other types

	let filterText = '';
	let fuse: Fuse<any>;
	let personas: any[] = [];

	$: {
		personas = $campaignStore?.campaign?.personas || [];
		if (personas.length > 0 && !fuse) {
			initFuse(personas);
		}
	}

	function initFuse(personasData: IPersona[]) {
		const options = {
			keys: ['name', 'characterClass'],
			threshold: 0.3,
		};
		fuse = new Fuse(personasData, options);
	}

	$: displayedPersonas =
		filterText && fuse
			? fuse.search(filterText).map((result) => result.item)
			: $campaignStore?.campaign?.personas;
</script>

<div class="container mx-auto py-8 xl:px-32 lg:px-16 px-4 pb-32 pt-16">
	<h1 class="lg:text-3xl text-xl font-bold">What do you seek in the Darkness?</h1>
	<div class="flex flex-col sticky left-0 top-0 right-0 w-full h-32 py-4 bg-white">
		<div class="flex relative mt-2 group">
			<Fa
				class="fa-fw text-xl left-3 my-auto flex top-0 bottom-0 text-gray-500 group-focus-within:text-primary absolute"
				icon={faSearch}
			/>
			<input
				bind:value={filterText}
				placeholder="Search for character name, rumor, location, ..."
				class="border-b w-full py-4 px-2 pl-12 outline-none focus:border-primary"
			/>
		</div>
		<div class="flex flex-wrap gap-4 bg-white py-3 pb-8">
			<button
				class="rounded-lg px-3 group py-2 hover:bg-primary-100 flex items-center gap-2 text-white bg-primary hover:text-primary"
			>
				<span
					class="size-2 flex rounded-full group-hover:bg-primary-400 group-hover:border-primary-400 bg-green-500"
				/>
				<span>Characters</span>
			</button>
			<!-- <button
				class="rounded-lg border px-3 group py-2 hover:bg-primary-100 flex items-center gap-2"
			>
				<span
					class="border size-2 flex rounded-full group-hover:bg-primary-400 group-hover:border-primary-400"
				/>
				<span>Rumors</span>
			</button>
			<button
				class="rounded-lg border px-3 group py-2 hover:bg-primary-100 flex items-center gap-2"
			>
				<span
					class="border size-2 flex rounded-full group-hover:bg-primary-400 group-hover:border-primary-400"
				/>
				<span>Locations</span>
			</button>
			<button
				class="rounded-lg border px-3 group py-2 hover:bg-primary-100 flex items-center gap-2"
			>
				<span
					class="border size-2 flex rounded-full group-hover:bg-primary-400 group-hover:border-primary-400"
				/>
				<span>Missions</span>
			</button>
			<button
				class="rounded-lg border px-3 group py-2 hover:bg-primary-100 flex items-center gap-2"
			>
				<span
					class="border size-2 flex rounded-full group-hover:bg-primary-400 group-hover:border-primary-400"
				/>
				<span>Sessions</span>
			</button> -->
		</div>
		<div>
			<div
				class="bg-white p-6 py-4 grid grid-cols-[300px,1fr,1fr,1fr,1fr,1fr] gap-8 items-center border-b border-dark"
			>
				<p class="text-gray-600 text-sm">Name</p>
				<p class="text-gray-600 text-sm">Level</p>
				<p class="text-gray-600 text-sm">Class</p>
				<p class="text-gray-600 text-sm">Status</p>
				<p class="text-gray-600 text-sm">Actions</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<div class="flex flex-col divide-y mt-32">
			{#if displayedPersonas}
				{#each displayedPersonas as persona}
					<div class="p-6 py-3 grid grid-cols-[300px,1fr,1fr,1fr,1fr,1fr] gap-8 items-center">
						<div class="flex items-center gap-3">
							<Avatar {persona} size="xs" />
							<h2 class="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
								{persona.name}
							</h2>
						</div>
						<p class="text-gray-600 text-sm">Level {persona.level}</p>
						<p class="text-gray-600 text-sm">{persona.characterClass}</p>
						<p class="text-gray-600 text-sm">NO STATUS YET</p>
						<div class="text-gray-600 text-sm">
							<a href={'/persona/' + persona.id} class="px-1 rounded border">Go to page</a>
						</div>
					</div>
				{/each}{/if}
			{#if personas.length === 0}
				<p class="text-center py-4">No matching personas found.</p>
			{/if}
		</div>
	</div>
</div>
