<script lang="ts">
	import { authHandlers } from '$lib/store/authStore';
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
</script>

<div class="pb-14 text-center">
	<h1 class="font-bold text-xl mb-2">Choose a Password</h1>
	<p class="opacity-60 text-sm">Must be at least 8 Characters</p>
</div>
<form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4 items-center">
	<Input label="Password" name="password" type="password" bind:value={password} minlength={8}/>
	<Input label="Confirm Password" name="confirmPassword" type="password" bind:value={confirmPassword} minlength={8}/>
	{#if passwordsDontMatchError}
		<p class="text-red-500">The passwords you entered do not match</p>
	{/if}
	<button type="submit" class="bg-primary py-0.5 text-white rounded-sm mt-2 mx-auto px-3 mt-8 py-2">Create Account</button>
</form>
