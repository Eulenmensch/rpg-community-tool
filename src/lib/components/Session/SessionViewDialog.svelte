<script lang="ts">
	import type { ISession } from '../../../Interfaces';
	import { authStore } from '$lib/store/authStore';
	import EmptySlot from './EmptySlot.svelte';
	import FilledSlot from './FilledSlot.svelte';
	import CreateOrEditSessionDialog from './CreateOrEditSessionDialog.svelte';
	import Fa from 'svelte-fa';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Dialog from '../Dialog.svelte';

	// --- Props ---
	export let session: ISession;
	export let dialog: HTMLDialogElement;

	let active_persona = $authStore.data.active_persona;
	let editDialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Dialog bind:dialog>
	<div class="bg-white w-2/3 mx-auto min-h-[20rem] rounded" on:click|stopPropagation>
		<div class="flex flex-col">
			<div
				class={`py-4 text-white rounded-t flex justify-between px-4
					${active_persona?.id == session.owner ? 'bg-red-200' : 'bg-black'}
				`}
			>
				<span class="text-lg">{session?.name ? session?.name : 'No name'}</span>
				{#if active_persona?.id == session.owner}
					<button
						on:click={() => {
							editDialog.showModal();
						}}
						class="w-6 h-6 flex items-center justify-center hover:bg-white hover:text-primary rounded"
						><Fa icon={faEdit} />
					</button>
				{/if}
			</div>
			<div class="py-8 px-20 text-dark/90 flex flex-col gap-12">
				<div class="flex justify-between">
					<div class="flex items-center">
						<div class="flex gap-2">
							{#each session.personas as persona}
								<FilledSlot {session} {persona} />
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
</Dialog>

<CreateOrEditSessionDialog bind:dialog={editDialog} {session} type="edit" />
