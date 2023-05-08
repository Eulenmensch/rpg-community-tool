<script lang="ts">
	import { authHandlers } from '$lib/store/authStore';
	import { onMount } from 'svelte';
	import Input from './Input.svelte';

	export let username: string;
	export let email: string;
	export let currentStep: number;
	let password: string;
	let confirmPassword: string;
	let passwordsDontMatchError = false;
	let generalError = false;

	//TODO: Error Handling, Duplicate users, Loading state
	async function handleRegister() {
		if (!email || !password || !username || !confirmPassword) {
			return;
		}
		if (password != confirmPassword) {
			passwordsDontMatchError = true;
			return;
		}
		passwordsDontMatchError = false;

		const res = await authHandlers.register(email, password, username);
		if (!res) generalError = true;
		if (res) {
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

<div class="pb-14 text-center">
	<h1 class="font-bold text-xl mb-2">Choose a Password</h1>
	<p class="opacity-60 text-sm">Must be at least 8 Characters</p>
</div>
<form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4 items-center">
	<Input
		label="Password"
		name="password"
		type="password"
		bind:value={password}
		minlength={8}
		bind:ref
	/>
	<Input
		label="Confirm Password"
		name="confirmPassword"
		type="password"
		bind:value={confirmPassword}
		minlength={8}
	/>
	{#if passwordsDontMatchError}
		<p class="text-red-500">The passwords you entered do not match</p>
	{/if}
	<button type="submit" class="bg-primary text-white rounded-sm mx-auto px-3 mt-8 py-2"
		>Create Account</button
	>
</form>
