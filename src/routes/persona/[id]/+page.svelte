<script lang="ts">
	import { page } from '$app/stores';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import RichTextEditor from '$lib/components/RichText/RichTextEditor.svelte';
	import RichTextPreview from '$lib/components/RichText/RichTextPreview.svelte';
	import { authStore } from '$lib/store/authStore';
	import { fileHandlers, uploadProgress } from '$lib/store/fileStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { faPen, faSave, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { IPersona } from '../../../Interfaces';
	import { campaignStore } from '$lib/store/campaignStore';

	let character: IPersona | null = null;
	let fileInput: HTMLInputElement;

	let isOwnCharacter = false;
	let isEditing = false;

	onMount(() => {
		getPersonaData();
	});

	async function getPersonaData() {
		const id = $page.params.id;
		let userData = $authStore.data;

		let campaignId = $authStore.data?.active_campaign;
		if (!campaignId) return;
		character = await personaHandlers.getPersonaById(campaignId, id);
		isOwnCharacter = character?.userId === userData.uid;
	}

	function handleSave() {
		isEditing = !isEditing;
		let userData = $authStore.data;
		if (!character?.id) return;
		personaHandlers.updatePersona(userData.uid, character?.id, character);
	}

	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files || !target.files[0] || !character?.id) return;

		const file = target.files[0];
		const userId = $authStore.data.uid;
		const personaId = character.id;

		if (!userId || !personaId) return;
		try {
			const path = `users/${userId}/personas/${personaId}/profile_image`;
			const downloadURL = await fileHandlers.uploadFile(file, path);
			await personaHandlers.updatePersona(userId, personaId, {
				imageUrl: downloadURL,
				campaignId: character.campaignId,
			});

			// Update local character state
			character.imageUrl = downloadURL;
			character = { ...character }; // Trigger Svelte reactivity

			// Update Stores
			authStore.update((store) => {
				return {
					...store,
					data: {
						...store.data,
						active_persona:
							store.data.active_persona?.id === personaId
								? { ...store.data.active_persona, imageUrl: downloadURL }
								: store.data.active_persona,
						personas: store.data.personas?.map((p) =>
							p.id === personaId ? { ...p, imageUrl: downloadURL } : p,
						),
					},
				};
			});
			campaignStore.update((store) => {
				return {
					...store,
					campaigns: store.campaigns.map((campaign) => {
						if (campaign.id === character?.campaignId) {
							return {
								...campaign,
								personas:
									campaign.personas?.map((p) =>
										p.id === personaId ? { ...p, imageUrl: downloadURL } : p,
									) || [],
							};
						}
						return campaign;
					}),
				};
			});
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	}

	async function handleRemoveImage() {
		if (!character?.id || !character.imageUrl) return;

		const userId = $authStore.data.uid;
		const personaId = character.id;

		try {
			const path = `users/${userId}/personas/${personaId}/profile_image`;
			await fileHandlers.deleteFile(path);
			await personaHandlers.updatePersona(userId, personaId, {
				imageUrl: null,
				campaignId: character.campaignId,
			});

			// Update local character state
			character.imageUrl = null;
			character = { ...character }; // Trigger Svelte reactivity

			// Update stores
			authStore.update((store) => {
				if (!store.data.active_persona) return store;

				let personas = store.data.personas?.map((p) =>
					p.id === personaId ? { ...p, imageUrl: null } : p,
				);

				let active_persona =
					store.data.active_persona.id === $page.params.id
						? {
								...store.data.active_persona,
								imageUrl: null,
						  }
						: store.data.active_persona;

				return {
					...store,
					data: {
						...store.data,
						active_persona: active_persona,
						personas: personas,
					},
				};
			});

			campaignStore.update((store) => {
				return {
					...store,
					campaigns: store.campaigns.map((campaign) => {
						if (campaign.id === character?.campaignId) {
							return {
								...campaign,
								personas:
									campaign.personas?.map((p) =>
										p.id === personaId ? { ...p, imageUrl: null } : p,
									) || [],
							};
						}
						return campaign;
					}),
				};
			});
		} catch (error) {
			console.error('Error removing image:', error);
		}
	}
</script>

{#if character}
	<section class="pb-32">
		{#if isOwnCharacter}
			<div class="py-5 flex items-center fixed bottom-16 right-16">
				{#if !isEditing}
					<button
						on:click={() => (isEditing = !isEditing)}
						class="bg-primary px-4 py-3 text-white text-lg rounded ml-auto flex items-center gap-3 shadow shadow-dark hover:bg-primary-400"
					>
						<Fa class="fa-fw" icon={faPen} />
						<span>Edit Profile</span>
					</button>
				{:else}
					<button
						on:click={handleSave}
						class="bg-primary px-4 py-3 text-white text-lg rounded ml-auto flex gap-3 items-center shadow shadow-dark hover:bg-primary-400"
					>
						<Fa class="fa-fw" icon={faSave} />
						<span>Save Profile</span>
					</button>
				{/if}
			</div>
		{/if}

		<div class="flex flex-col-reverse lg:flex-row">
			<div class="flex flex-col w-full">
				{#if isEditing}
					<div class="flex lg:flex-row flex-col w-full border divide-x items-center">
						<input
							type="text"
							bind:value={character.name}
							class="text-4xl mx-4 py-2 focus:outline-none w-full focus:border-primary bg-slate-100 border border-transparent lg:ml-20"
						/>
						<div class="divide-y w-full lg:w-1/3">
							<p class="w-full px-4 py-6 text-xl">No status yet</p>
							<div class="flex flex-row items-center py-6 px-4 gap-2">
								<label class="mb-0.5 text-xl" for="level">Level:</label>
								<NumberInput bind:value={character.level} max={20} min={1} />
							</div>
							<div class="py-4 px-4">
								<input
									type="text"
									bind:value={character.characterClass}
									class="text-xl border w-full border-transparent bg-slate-100 py-2 focus:outline-none focus:border-primary"
									placeholder="Character Class"
								/>
							</div>
						</div>
					</div>
					<div class="p-4 border lg:px-20">
						<RichTextEditor
							content={character?.about}
							on:update={(e) => {
								if (character) character.about = e.detail;
							}}
						/>
					</div>
				{:else}
					<div class="flex flex-col lg:flex-row w-full border divide-x items-center">
						<h1
							class="lg:text-5xl text-2xl w-full border-b lg:border-b-0 lg:w-2/3 px-4 py-6 lg:pl-20 font-semibold"
						>
							{character?.name}
						</h1>
						<div class="divide-y w-full lg:w-1/3">
							<p class="w-full px-4 py-6 text-xl">No status yet</p>
							<p class="w-full px-4 py-6 text-xl">Level: {character?.level}</p>
							<p class="w-full px-4 py-6 text-xl">{character?.characterClass}</p>
						</div>
					</div>
					<div class="w-full bg-gradient-to-b from-gray-300 via-gray-300/40 to-white/0 pr-[1px]">
						<div class="lg:px-20 px-4 bg-white">
							<div class="flex h-full w-full items-center bg-white back">
								<RichTextPreview content={character?.about} />
							</div>
						</div>
					</div>
				{/if}
			</div>
			<div class="w-1/2">
				{#if character.imageUrl}
					<div class="relative">
						<img src={character.imageUrl} alt="Character" class="w-full object-cover px-4" />
						{#if isEditing}
							<button
								on:click={handleRemoveImage}
								class="absolute top-2 right-2 border-red-500 border bg-white p-2 rounded text-red-500 hover:bg-slate-200 transition-colors flex items-center gap-2"
							>
								<Fa icon={faTrash} />
								<span>Remove Image</span>
							</button>
						{/if}
					</div>
				{:else}
					<div
						class="w-full bg-slate-100 rounded-lg h-96 flex items-center justify-center text-dark/50 pt-12"
					>
						No Image yet
					</div>
				{/if}
				{#if isEditing}
					<div class="mt-4 px-6">
						<input
							type="file"
							accept="image/*"
							on:change={handleFileUpload}
							bind:this={fileInput}
							class="hidden"
						/>
						<button
							on:click={() => fileInput.click()}
							class="w-full border border-primary text-primary hover:bg-slate-100 py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
						>
							<Fa icon={faUpload} />
							<span>{character?.imageUrl ? 'Change Image' : 'Upload Image'}</span>
						</button>
					</div>
					{#if $uploadProgress > 0 && $uploadProgress < 100}
						<div class="mt-2 bg-gray-200 rounded-full h-2.5">
							<div
								class="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
								style="width: {$uploadProgress}%"
							/>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</section>
{/if}
