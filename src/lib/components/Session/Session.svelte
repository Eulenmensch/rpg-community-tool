<script lang="ts">
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../Interfaces';
	import { formatDateAsDisplayVersion, sessionStatusToIcon } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import CreateOrEditSessionDialog from './Dialog/CreateOrEditSessionDialog.svelte';
	import SessionViewDialog from './Dialog/SessionPreviewDialog.svelte';
	import FilledSlot from './FilledSlot.svelte';

	export let session: ISession;

	let active_persona = $authStore.data.active_persona;
	let viewDialog: HTMLDialogElement;
	let editDialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	on:click={() => viewDialog.showModal()}
	class={`text-white py-4 px-5 pr-14 rounded flex items-center justify-between ${
		active_persona?.id == session.owner.id ? 'bg-black' : 'bg-black'
	}`}
>
	<div class="flex items-center gap-7">
		<Fa class="fa-fw text-lg w-10" icon={sessionStatusToIcon[session.status]} />
		<FilledSlot persona={session.owner} {session} disableUnsubscribe={true} />
		<p class="ml-4">{session.name}</p>
	</div>

	<div class="flex gap-12 items-center">
		<p>{formatDateAsDisplayVersion(session.date)}</p>
		<p class="ml-4">PLAYERS</p>
		<p>{session?.personas?.length}/{session.slots}</p>
		{#if active_persona?.id == session.owner.id}
			<div
				on:mousedown|stopPropagation
				on:click|stopPropagation={() => editDialog.showModal()}
				class="hover:bg-gray-100 hover:text-primary w-6 h-6 flex justify-center items-center rounded"
			>
				<Fa icon={faEdit} />
			</div>
		{/if}
	</div>
</button>
<SessionViewDialog bind:dialog={viewDialog} {session} />
<CreateOrEditSessionDialog {session} bind:dialog={editDialog} type="edit" />
