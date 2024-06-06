<script lang="ts">
	import { formatDateAsDisplayVersion, sessionStatusToIcon, userOwnsCampaign } from '$lib/helpers';
	import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../../Interfaces';
	import CustomDialog from '../../CustomDialog.svelte';
	import EmptySlot from '../EmptySlot.svelte';
	import FilledSlot from '../FilledSlot.svelte';
	import CreateOrEditSessionDialog from './CreateOrEditSessionDialog.svelte';
	import StartButton from './StartButton.svelte';

	// --- Props ---
	export let session: ISession;
	export let open = false;

	let editDialogOpen = false;
</script>

<CustomDialog bind:open>
	<div
		class="bg-white flex flex-col mx-auto rounded-2xl font-inknut overflow-hidden w-[1200px]"
		role="dialog"
		slot="content"
	>
		<div class="bg-black text-white py-5 px-10 text-xl flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Fa class="text-2lg" icon={sessionStatusToIcon[session.status]} />
				<p class="">
					{session?.name}
				</p>
			</div>
			<div class="flex items-center gap-8">
				{#if userOwnsCampaign()}
					<StartButton {session} />
					<button
						on:click={() => (editDialogOpen = true)}
						class="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-primary rounded"
						><Fa class="text-2xl" icon={faEdit} />
					</button>
					<button
						on:click={() => (open = false)}
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
			{#if session?.playables}
				<div>
					<p class="text-lg font-semibold">Related Items</p>
					{#each session?.playables as playable}
						<div>{playable.name}</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</CustomDialog>
<CreateOrEditSessionDialog bind:dialogOpen={editDialogOpen} {session} type="edit" />
