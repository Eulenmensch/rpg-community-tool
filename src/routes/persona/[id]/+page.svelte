<script lang="ts">
	import { page } from '$app/stores';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import RichTextEditor from '$lib/components/RichText/RichTextEditor.svelte';
	import RichTextPreview from '$lib/components/RichText/RichTextPreview.svelte';
	import { authStore } from '$lib/store/authStore';
	import { fileHandlers } from '$lib/store/fileStore';
	import { personaHandlers } from '$lib/store/personaStore';
	import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { IPersona } from '../../../Interfaces';

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
		if (!target.files || !target.files[0]) return;
		if (!character?.id) return;

		const file = target.files[0];
		const userId = $authStore.data.uid;
		const personaId = character?.id;

		if (!userId || !personaId) return;
		try {
			const path = `users/${userId}/personas/${personaId}/profile_image`;
			const downloadURL = await fileHandlers.uploadFile(file, path);
			let userData = $authStore.data;
			await personaHandlers.updatePersona(userData.uid, character?.id, {
				imageUrl: downloadURL,
				campaignId: character.campaignId,
			});

			//TODO: Update Stores
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	}
</script>

{#if character}
	<section class="xl:px-20 2xl:px-40 px-4 py-12 pb-40">
		{#if isOwnCharacter}
			<div class="py-5 flex items-center">
				{#if !isEditing}
					<button
						on:click={() => (isEditing = !isEditing)}
						class="bg-primary px-3 py-2 text-white rounded ml-auto flex items-center gap-2"
					>
						<Fa class="fa-fw" icon={faPen} />
						<span>EditProfile</span></button
					>
				{:else}
					<button
						on:click={handleSave}
						class="bg-primary px-3 py-2 text-white rounded ml-auto flex gap-2 items-center"
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
							class="text-4xl mx-4 py-2 focus:outline-none w-full focus:border-primary bg-slate-100 border border-transparent"
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
					<div class="p-4 border">
						<RichTextEditor
							content={character?.about}
							on:update={(e) => {
								if (character) character.about = e.detail;
							}}
						/>
					</div>
				{:else}
					<div class="flex flex-col lg:flex-row w-full border divide-x items-center">
						<h1 class="text-4xl w-full border-b lg:border-b-0 lg:w-2/3 px-4 py-6">
							{character?.name}
						</h1>
						<div class="divide-y w-full lg:w-1/3">
							<p class="w-full px-4 py-6 text-xl">No status yet</p>
							<p class="w-full px-4 py-6 text-xl">Level: {character?.level}</p>
							<p class="w-full px-4 py-6 text-xl">{character?.characterClass}</p>
						</div>
					</div>
					<div class="p-4 border">
						<RichTextPreview content={character?.about} />
					</div>
				{/if}
			</div>
			{#if isEditing}
				<div class="bg-slate-100 w-96">
					<input type="file" accept="image/*" on:change={handleFileUpload} bind:this={fileInput} />
				</div>
			{:else if character.imageUrl}
				<img src={character.imageUrl} alt="Character" class="size-96 object-contain" />
			{:else}
				<div class="w-96 object-contain bg-slate-100 justify-center items-center flex text-dark/50">
					No Image yet
				</div>
			{/if}
		</div>
	</section>
{/if}
