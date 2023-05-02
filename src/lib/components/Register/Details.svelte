<script lang="ts">
	import { authHandlers } from '$lib/store/authStore';

	export let username: string;
	export let email: string;
	export let currentStep: number;
	let error = false;

	//TODO: Error Handling, Duplicate users, Loading state
	async function checkifUserExists() {
		error = await authHandlers.doesUserExist(email, username);
		if (!error) {
			currentStep += 1;
		}
	}
</script>

<button class="border border-gray rounded px-4 py-1">Sign up with Google</button>
<span class="">Or</span>
<form on:submit|preventDefault={checkifUserExists} class="flex flex-col">
	<label for="username">Username</label>
	<input
		bind:value={username}
		placeholder="Username"
		class="border border-gray w-80"
		name="username"
		type="text"
		required
	/>
	<label for="email">Email</label>
	<input
		placeholder="Email"
		bind:value={email}
		class="border border-gray w-80"
		name="email"
		type="email"
		required
	/>
	{#if error}
		<span class="text-red-500 text-sm"
			>The username or the email is already in use <br /> Please try another one</span
		>
	{/if}
	<span />
	<button type="submit" class="bg-primary py-0.5 text-white rounded-sm mt-2">Continue</button>
</form>
