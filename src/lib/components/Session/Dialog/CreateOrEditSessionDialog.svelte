<script lang="ts">
	import CustomDialog from '$lib/components/CustomDialog.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { authStore } from '$lib/store/authStore';
	import { sessionHandlers, sessionStore } from '$lib/store/sessionStore';
	import { faFileEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { DateFormat, ISession } from '../../../../Interfaces';
	import Button from '$lib/components/Button.svelte';
	import PlayablesList from '$lib/components/Session/PlayablesList.svelte';

	const today = new Date();
	let todayAsString = today.toISOString().split('T')[0] as DateFormat;
	$: activeCampaignId = $authStore.data.active_persona?.campaignId;
	let active_persona = $authStore.data.active_persona;
	let defaultSession: ISession = {
		date: todayAsString,
		description: '',
		name: '',
		gm_persona: {
			name: active_persona?.name ? active_persona?.name : '',
			type: 'master',
			id: active_persona?.id,
			campaignId: activeCampaignId ? activeCampaignId : '',
		},
		slots: 4,
		status: 'available',
		personas: [],
		playables: [],
	};
	const MAX_SESSION_SLOTS = 10;
	const MIN_SESSION_SLOTS = 1;

	let deleteDialogOpen = false;

	// --- Props ---
	export let session: ISession = { ...defaultSession };
	export let type: 'create' | 'edit';
	export let dialogOpen = false;

	async function createSession() {
		if (!activeCampaignId) return;
		if (!(active_persona && active_persona?.id)) return;

		const newSessionId = await sessionHandlers.createSessionForCampaign(activeCampaignId, session);
		session.id = newSessionId;

		sessionHandlers.addPlayableToSession(activeCampaignId, session);
		sessionStore.update((curr) => [...curr, session]);
		dialogOpen = false;
		resetForm();
		session = { ...defaultSession };
	}

	async function editSession() {
		if (!activeCampaignId) return;
		if (!(active_persona && active_persona?.id)) return;
		if (!session?.id) return;

		await sessionHandlers.editSession(activeCampaignId, session);

		sessionStore.update((curr) =>
			curr.map((_session) => {
				if (_session.id === session?.id) {
					return session;
				}
				return _session;
			}),
		);

		resetForm();
	}

	function resetForm() {
		const form = document.getElementById('create_session_form') as HTMLFormElement;
		if (!form) return;
		form.reset();
		dialogOpen = false;
		deleteDialogOpen = false;
	}

	async function deleteSession() {
		if (!activeCampaignId) return;
		if (!(active_persona && active_persona?.id)) return;
		if (!session?.id) return;
		sessionHandlers.deleteSession(activeCampaignId, session?.id);

		sessionStore.update((curr) => curr.filter((_session) => session.id != _session.id));
		resetForm();
	}
</script>

<CustomDialog bind:open={dialogOpen}>
	<form
		slot="content"
		id="create_session_form"
		on:submit|preventDefault={() => {
			type === 'edit' ? editSession() : createSession();
		}}
		class="flex-col flex font-inknut overflow-hidden rounded-lg mx-auto w-[1200px] h-[calc(100vh-60px)]"
	>
		<div class="bg-black text-white py-5 px-10 text-xl flex items-center justify-between">
			<div class="flex items-center gap-2">
				{#if type === 'edit'}
					<Fa class="text-2xl" icon={faFileEdit} />
				{/if}
				{#if type === 'create'}
					<Fa class="text-2xl" icon={faPlusCircle} />
				{/if}
				<p class="">
					{type === 'edit'
						? `Edit: ${session?.name}`
						: `Create: ${session?.name ? session?.name : 'New Session'}`}
				</p>
			</div>
			{#if type === 'edit'}
				<Button handleClick={() => (deleteDialogOpen = true)} className="bg-red-500">Delete</Button>
			{/if}
		</div>
		<div class="px-16 flex flex-col gap-8 py-10 bg-white overflow-auto h-full">
			<div class="flex lg:items-center justify-between lg:gap-20 gap-4 flex-col lg:flex-row">
				<div class="flex flex-col gap-2 w-full lg:w-2/3">
					<label for="title" class="text-lg font-semibold">Title</label>
					<input
						class="border border-gray rounded-sm py-0.5 px-1 w-full"
						name="title"
						placeholder="Title..."
						bind:value={session.name}
						type="text"
						required
					/>
				</div>
				<div class="flex gap-2 flex-col w-full lg:w-1/3">
					<label class="text-lg font-semibold" for="date">Date</label>
					<input
						name="date"
						class="py-1 border border-gray px-3"
						placeholder="date"
						bind:value={session.date}
						type="date"
						required
					/>
				</div>
			</div>
			<div class=" flex gap-4 items-center">
				<label for="slots" class="text-lg font-semibold"> Player Limit</label>

				<NumberInput max={MAX_SESSION_SLOTS} min={MIN_SESSION_SLOTS} bind:value={session.slots} />
				{#if session.slots <= MIN_SESSION_SLOTS}
					<p>Minimum number of players is 1</p>
				{/if}
				{#if session.slots >= MAX_SESSION_SLOTS}
					<p>Maximum number of players is 10</p>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-lg font-semibold" for="description">Info</label>
				<textarea
					name="description"
					class="min-h-[150px] border border-gray-400 rounded-sm p-4"
					placeholder="Describe your session"
					bind:value={session.description}
				/>
			</div>

			<PlayablesList bind:session />

			<div class="flex items-center gap-3 justify-end mt-10">
				<Button handleClick={() => resetForm()} className="bg-gray-400 hover:bg-gray-500"
					>Cancel</Button
				>
				<Button type="submit" className="bg-primary text-white">
					{type === 'edit' ? 'Save' : 'Create session'}
				</Button>
			</div>
		</div>
	</form>
</CustomDialog>

{#if type === 'edit'}
	<CustomDialog bind:open={deleteDialogOpen}>
		<div
			slot="content"
			class="p-4 bg-white flex flex-col gap-2 mx-auto w-[400px] rounded font-inknut"
		>
			<p class="text-lg mb-4">Do you really want to delete the entry?</p>
			<div class="flex items-strech justify-end gap-4">
				<button
					type="button"
					on:click={() => (deleteDialogOpen = false)}
					class="p-2 bg-slate-50 border rounded"
					>Do not delete
				</button>
				<Button type="button" handleClick={deleteSession} className="bg-red-500"
					>Delete forever</Button
				>
			</div>
		</div>
	</CustomDialog>
{/if}
