<script lang="ts">
	import { iconStore } from '$lib/store/iconStore';
	import type { IconType } from '../../../../Interfaces';

	export let selectedIconType: string | IconType;
	export let currentColor = 'text-yellow-300';
</script>

<div class="flex gap-2">
	{#each Object.entries($iconStore) as [name, svg]}
		<button
			on:click={() => (selectedIconType = name)}
			class="flex items-center justify-center rounded p-0.5 {selectedIconType == name
				? currentColor + ' ' + 'bg-primary-800/50'
				: 'text-gray-100 opacity-80'}"
		>
			{@html svg}
		</button>
	{/each}
</div>
