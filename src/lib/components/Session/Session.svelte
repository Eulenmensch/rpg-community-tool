<script lang="ts">
	import type { ISession } from '../../../Interfaces';
	import EmptySlot from './EmptySlot.svelte';
	import FilledSlot from './FilledSlot.svelte';

	export let session: ISession;
	let dialogOpen = false;
</script>

<button
	on:click={() => (dialogOpen = !dialogOpen)}
	class="bg-dark text-white py-3 px-5 rounded flex justify-between"
>
	<p>{session.name}</p>
	<div class="flex gap-3">
		<p>{session.date}</p>
		<p>{session.personas.length}/{session.slots}</p>
	</div>
</button>
{#if dialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 bg-dark/70 flex items-center"
		on:click={() => (dialogOpen = false)}
		aria-modal="true"
		tabindex="-1"
	>
		<div class="bg-white w-2/3 mx-auto min-h-[20rem] rounded" on:click|stopPropagation>
			<div class="flex flex-col">
				<div class="text-lg bg-black py-4 text-white rounded-t px-4">
					{session?.name ? session?.name : 'No name'}
				</div>
				<div class="py-8 px-20 text-dark/90 flex flex-col gap-12">
					<div class="flex justify-between">
						<div class="flex items-center">
							<div class="flex gap-2">
								{#each session.personas as persona}
									<FilledSlot />
								{/each}
								{#each Array(session.slots - session.personas.length) as _}
									<EmptySlot {session} />
								{/each}
							</div>
						</div>
						<span>{session.date}</span>
					</div>
					<span>{session?.description ? session?.description : 'No description'}</span>
				</div>
			</div>
		</div>
	</div>
{/if}
