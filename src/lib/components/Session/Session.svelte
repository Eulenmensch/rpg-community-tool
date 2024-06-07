<script lang="ts">
	import Debug from '$lib/components/Debug/Debug.svelte';
	import { formatDateAsDisplayVersion, sessionStatusToIcon, userOwnsCampaign } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import { campaignStore } from '$lib/store/campaignStore';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ISession } from '../../../Interfaces';
	import CreateOrEditSessionDialog from './Dialog/CreateOrEditSessionDialog.svelte';
	import SessionPreviewDialog from './Dialog/SessionPreviewDialog.svelte';
	import FilledSlot from './FilledSlot.svelte';

	export let session: ISession;
	let DEBUG = false;

	let open = false;
	let editOpen = false;

	$: userIsOwner = userOwnsCampaign();
</script>

<button
	on:click={() => (open = true)}
	class={`text-white py-4 px-5 rounded flex items-center justify-between bg-black`}
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
					<FilledSlot {persona} {session} disableUnsubscribe />
				</div>
			{/each}
		</div>
		<p class="w-12 text-center">{session?.personas?.length}/{session.slots}</p>
		{#if userIsOwner}
			<div class="w-10 flex">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					tabindex="0"
					role="button"
					on:mousedown|stopPropagation
					on:click|stopPropagation={() => (editOpen = true)}
					class="
				hover:bg-gray-100 hover:text-primary mx-auto
				w-6 h-6 flex justify-center items-center rounded"
				>
					<Fa icon={faEdit} />
				</div>
			</div>
		{/if}
	</div>
	{#if DEBUG}
		<Debug {campaignStore} {authStore} />
	{/if}
</button>

<SessionPreviewDialog bind:open bind:session />
<CreateOrEditSessionDialog bind:session bind:dialogOpen={editOpen} type="edit" />
