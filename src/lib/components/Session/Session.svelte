<script lang="ts">
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../Interfaces';
	import { sessionStatusToIcon } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import CreateOrEditSessionDialog from './Dialog/CreateOrEditSessionDialog.svelte';
	import SessionViewDialog from './Dialog/SessionPreviewDialog.svelte';

	export let session: ISession;

	let active_persona = $authStore.data.active_persona;
	let viewDialog: HTMLDialogElement;
	let editDialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	on:click={() => viewDialog.showModal()}
	class={`text-white py-4 px-5 rounded flex justify-between ${
		active_persona?.id == session.owner ? 'bg-black' : 'bg-black'
	}`}
>
	<div class="flex items-center gap-3">
		<Fa class="text-lg" icon={sessionStatusToIcon[session.status]} />
		<p>{session.name}</p>
	</div>

	<div class="flex gap-3 items-center">
		<p>{session.date}</p>
		<p>{session.personas.length}/{session.slots}</p>
		{#if active_persona?.id == session.owner}
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
