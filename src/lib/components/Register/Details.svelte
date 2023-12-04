<script lang="ts">
	import { authHandlers } from '$lib/store/authStore';
	import { onMount } from 'svelte';
	import Input from './Input.svelte';

	export let username: string;
	export let email: string;
	export let currentStep: number;
	let error = false;

	async function checkIfUserExists() {
		if (!email || !username) {
			error = true;
			return;
		}
		error = await authHandlers.doesUserExist(email, username);
		if (!error) {
			currentStep += 1;
		}
	}

	let ref: any;
	onMount(() => {
		if (ref) {
			ref.focus();
		}
	});
</script>

<form on:submit|preventDefault={checkIfUserExists} class="flex flex-col gap-4 items-center">
	<Input label="Username" name="username" type="text" bind:value={username} bind:ref />
	<Input label="Email" name="email" type="email" bind:value={email} />
	{#if error}
		<span class="text-red-500 text-sm text-center">
			The username or the email is already in use <br /> Please try another one
		</span>
	{/if}
	<button type="submit" class="bg-primary text-white mx-auto px-3 py-2 rounded-sm mt-4"
		>Continue</button
	>
</form>
