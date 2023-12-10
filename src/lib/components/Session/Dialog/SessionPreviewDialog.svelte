<script lang="ts">
	import type { ISession } from '../../../../Interfaces';
	import { authStore } from '$lib/store/authStore';
	import EmptySlot from '../EmptySlot.svelte';
	import FilledSlot from '../FilledSlot.svelte';
	import CreateOrEditSessionDialog from './CreateOrEditSessionDialog.svelte';
	import Fa from 'svelte-fa';
	import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
	import Dialog from '../../Dialog.svelte';
	import { formatDateAsDisplayVersion, sessionStatusToIcon } from '$lib/helpers';
	import StartButton from './StartButton.svelte';

	// --- Props ---
	export let session: ISession;
	export let dialog: HTMLDialogElement;

	let active_persona = $authStore.data.active_persona;
	let editDialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Dialog bind:dialog>
	<div
		class="bg-white flex flex-col mx-auto w-2/3 rounded-2xl font-inknut overflow-hidden"
		on:click|stopPropagation
	>
		<div class="bg-black text-white py-5 px-10 text-xl flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Fa class="text-2lg" icon={sessionStatusToIcon[session.status]} />
				<p class="">
					{session?.name}
				</p>
			</div>
			<div class="flex items-center gap-8">
				{#if active_persona?.id == session.gm_persona.id}
					<StartButton {session} />
					<button
						on:click={() => {
							editDialog.showModal();
						}}
						class="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-primary rounded"
						><Fa class="text-2xl" icon={faEdit} />
					</button>
					<button
						on:click={() => {
							dialog.close();
						}}
						class="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-primary rounded"
						><Fa class="text-4xl" icon={faXmark} />
					</button>
				{/if}
			</div>
		</div>
		<div class="py-16 px-[10%] text-dark/90 flex flex-col gap-14">
			<div class="flex justify-between">
				<div class="flex items-center gap-10">
					<FilledSlot disableUnsubscribe {session} persona={session.gm_persona} />
					<div class="flex gap-2.5 items-center">
						{#each session.personas as persona}
							<FilledSlot {session} {persona} />
						{/each}
						{#each Array(session.slots - session.personas.length) as _}
							<EmptySlot {session} />
						{/each}
					</div>
				</div>
				<span class="text-lg">{formatDateAsDisplayVersion(session.date)}</span>
			</div>
			<p class="leading-relaxed">
				{session?.description ? session?.description : 'No description'}
			</p>
		</div>
	</div>
</Dialog>
<CreateOrEditSessionDialog bind:dialog={editDialog} {session} type="edit" />
