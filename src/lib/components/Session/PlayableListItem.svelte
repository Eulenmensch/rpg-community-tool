<script lang="ts">
	import type { IPlayable } from '../../../Interfaces';
	import Button from '../Button.svelte';

	export let playable;
	export let playablesInSession: IPlayable[];
</script>

<div class="flex justify-between items-center gap-4">
	<p
		class="bg-black w-full text-white p-3 rounded {playablesInSession.includes(playable) &&
			'opacity-60'}"
	>
		{playable?.name}
	</p>

	{#if playablesInSession.includes(playable)}
		<Button
			className="w-32 items-center text-center flex justify-center"
			handleClick={() =>
				(playablesInSession = playablesInSession.filter((item) => item !== playable))}
		>
			Remove
		</Button>
	{:else}
		<Button
			className="w-32 items-center text-center flex justify-center"
			handleClick={() => (playablesInSession = [...playablesInSession, playable])}
		>
			Add
		</Button>
	{/if}
</div>
