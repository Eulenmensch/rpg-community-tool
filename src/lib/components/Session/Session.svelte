<script lang="ts">
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../Interfaces';
	import { formatDateAsDisplayVersion, sessionStatusToIcon } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import CreateOrEditSessionDialog from './Dialog/CreateOrEditSessionDialog.svelte';
	import SessionViewDialog from './Dialog/SessionPreviewDialog.svelte';
	import FilledSlot from './FilledSlot.svelte';
	import { campaignStore } from '$lib/store/campaignStore';

	export let session: ISession;

	let active_persona = $authStore.data.active_persona;
	let viewDialog: HTMLDialogElement;
	let editDialog: HTMLDialogElement;

	console.log(session);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	on:click={() => viewDialog.showModal()}
	class={`text-white py-4 px-5 rounded flex items-center justify-between ${
		active_persona?.id == session.gm_persona.id ? 'bg-black' : 'bg-black'
	}`}
>
	<div class="flex items-center gap-7">
		<Fa class="fa-fw text-lg w-10" icon={sessionStatusToIcon[session.status]} />
		<FilledSlot persona={session.gm_persona} {session} disableUnsubscribe={true} />
		<p class="ml-4">{session.name}</p>
	</div>

	<div class="flex items-center gap-8">
		<p class="w-36 text-left">{formatDateAsDisplayVersion(session.date)}</p>
		<div class="flex w-36 px-2 items-center justify-end">
			{#if session.personas.length > 4}
				<p class="pr-2 mr-0.5 mt-2">...</p>
			{/if}
			{#if session.personas.length == 0}
				<p class="mt-2 text-xs text-right opacity-70">No signups yet</p>
			{/if}
			{#each session?.personas as persona}
				<div class="-mx-2">
					<FilledSlot {persona} {session} />
				</div>
			{/each}
		</div>
		<p class="w-12 text-center">{session?.personas?.length}/{session.slots}</p>
		{#if $campaignStore?.campaign?.owner_id === $authStore?.data?.uid}
			<div class="w-10 flex">
				<div
					on:mousedown|stopPropagation
					on:click|stopPropagation={() => editDialog.showModal()}
					class="
				hover:bg-gray-100 hover:text-primary mx-auto
				w-6 h-6 flex justify-center items-center rounded"
				>
					<Fa icon={faEdit} />
				</div>
			</div>
		{/if}
	</div>
</button>
<SessionViewDialog bind:dialog={viewDialog} {session} />
<CreateOrEditSessionDialog {session} bind:dialog={editDialog} type="edit" />
