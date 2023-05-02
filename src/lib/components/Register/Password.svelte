<script lang="ts">
	import { authHandlers } from '$lib/store/authStore';

	export let username: string;
	export let email: string;
	export let currentStep: number;
	let password: string;
	let confirmPassword: string;
	let passwordsDontMatchError = false;
	let generalError = false;

	//TODO: Error Handling, Duplicate users, Loading state
	async function handleRegister() {
		console.log(email, password, confirmPassword, username);
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

<div class="pb-8">
	<h1 class="font-bold text-xl">Choose a Password</h1>
	<p class="opacity-60">Must be at least 8 Characters</p>
</div>
<form on:submit|preventDefault={handleRegister} class="flex flex-col">
	<label for="password">Password</label>
	<input
		bind:value={password}
		placeholder="Password"
		class="border border-gray"
		name="password"
		type="password"
		required
	/>
	<label for="confirmPassword">Confirm Password</label>
	<input
		placeholder="Password"
		bind:value={confirmPassword}
		class="border border-gray"
		name="confirmPassword"
		type="password"
		required
	/>
	{#if passwordsDontMatchError}
		<p class="text-red-500">The passwords you entered do not match</p>
	{/if}
	<button type="submit" class="bg-primary py-0.5 text-white rounded-sm mt-2">Create Account</button>
</form>
