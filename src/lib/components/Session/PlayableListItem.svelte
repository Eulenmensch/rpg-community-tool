<script lang="ts">
	import type { IPlayable, ISession } from '../../../Interfaces';
	import Button from '../Button.svelte';

	export let playable: IPlayable;
	export let session: ISession;

	function addPlayable(playable: IPlayable) {
		session.playables = [...session.playables, playable];
	}

	function removePlayable(playable: IPlayable) {
		session.playables = session?.playables.filter((item) => item.name !== playable.name);
	}

	let isInSession = false;
	$: isInSession = session?.playables?.some((item) => item.name === playable.name);
</script>

<div class="flex justify-between items-center gap-4">
	<p class="bg-black w-full text-white p-3 rounded {isInSession && 'opacity-60'}">
		{playable?.name}
	</p>

	{#if isInSession}
		<Button
			className="w-32 items-center text-center flex justify-center"
			handleClick={() => removePlayable(playable)}
		>
			Remove
		</Button>
	{:else}
		<Button
			className="w-32 items-center text-center flex justify-center"
			handleClick={() => addPlayable(playable)}
		>
			Add
		</Button>
	{/if}
</div>
