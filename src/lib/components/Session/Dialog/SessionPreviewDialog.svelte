<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';
	import RichTextPreview from '$lib/components/RichText/RichTextPreview.svelte';
	import { formatDateAsDisplayVersion, sessionStatusToIcon, userOwnsCampaign } from '$lib/helpers';
	import type { ISession } from '$lib/Interfaces';
	import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import CustomDialog from '../../CustomDialog.svelte';
	import EmptySlot from '../EmptySlot.svelte';
	import FilledSlot from '../FilledSlot.svelte';
	import CreateOrEditSessionDialog from './CreateOrEditSessionDialog.svelte';
	import StartButton from './StartButton.svelte';

	// --- Props ---
	export let session: ISession;
	export let open = false;

	let editDialogOpen = false;

	$: userIsOwner = userOwnsCampaign();
</script>

<CustomDialog bind:open>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		on:click|stopPropagation
		class="bg-white flex flex-col mx-auto rounded-lg font-inknut overflow-hidden w-[1200px] max-h-[calc(100vh-60px)]"
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
				{#if userIsOwner}
					<StartButton bind:session />
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
		<div class="py-16 px-[10%] text-dark/90 flex flex-col gap-14 overflow-y-auto">
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
			{#if !session?.description}
				<p class="leading-relaxed text-dark/70">There is no description yet</p>
			{/if}
			<RichTextPreview content={session?.description} />
			{#if session?.playables}
				<div>
					<Divider label="Related Items" />
					<div class="flex flex-col gap-2 mt-8">
						{#each session?.playables as playable}
							<div class="p-2 py-3 rounded bg-black text-white">{playable.name}</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</CustomDialog>
<CreateOrEditSessionDialog bind:dialogOpen={editDialogOpen} {session} type="edit" />
