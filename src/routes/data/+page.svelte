<script lang="ts">
	import { campaignStore } from '$lib/store/campaignStore';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	//TODO: Add Search, Add Filter, Add Scroll
</script>

<div class="container mx-auto py-8 px-32 pb-32">
	<h1 class="text-3xl font-bold">What do you seek in the Darkness?</h1>
	<div class="flex flex-col sticky left-0 top-0 right-0 w-full h-32 py-4 bg-white">
		<div class="flex relative mt-2 group">
			<Fa
				class="fa-fw text-xl left-3  my-auto flex top-0 bottom-0 text-gray-500  group-focus-within:text-primary absolute"
				icon={faSearch}
			/>
			<input
				placeholder="Search for character name, rumor, location, ..."
				class="border-b w-full py-4 px-2 pl-12 outline-none focus:border-primary"
			/>
		</div>
		<div class="flex gap-4 bg-white py-3 pb-5">
			<div class="rounded-lg border px-3 py-2">Characters</div>
			<div class="rounded-lg border px-3 py-2">Rumors</div>
			<div class="rounded-lg border px-3 py-2">Locations</div>
			<div class="rounded-lg border px-3 py-2">Missions</div>
			<div class="rounded-lg border px-3 py-2">Sessions</div>
		</div>
		<div>
			<div class="bg-white p-6 py-4 grid grid-cols-6 gap-8 items-center border-b border-dark">
				<p class="text-gray-600 text-sm" />
				<p class="text-gray-600 text-sm">Name</p>
				<p class="text-gray-600 text-sm">Level</p>
				<p class="text-gray-600 text-sm">Class</p>
				<p class="text-gray-600 text-sm">Status</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		{#if $campaignStore?.campaign?.personas}
			<div class="flex flex-col divide-y mt-32">
				{#each $campaignStore?.campaign?.personas as persona}
					<div class="p-6 py-3 grid grid-cols-6 gap-8 items-center">
						<div class="bg-red-500 size-7 rounded-full" />
						<h2 class="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
							{persona.name}
						</h2>
						<p class="text-gray-600 text-sm">Level {persona.level}</p>
						<p class="text-gray-600 text-sm">{persona.characterClass}</p>
						<p class="text-gray-600 text-sm">NO STATUS YET</p>
					</div>
					<div class="p-6 py-3 grid grid-cols-6 gap-8 items-center">
						<div class="bg-red-500 size-7 rounded-full" />
						<h2 class="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
							{persona.name}
						</h2>
						<p class="text-gray-600 text-sm">Level {persona.level}</p>
						<p class="text-gray-600 text-sm">{persona.characterClass}</p>
						<p class="text-gray-600 text-sm">NO STATUS YET</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
