<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Register/Input.svelte';
	import logo from '$lib/images/logo.svg';
	import { authHandlers } from '$lib/store/authStore';

	let email: string;
	let password: string;
	let error = false;

	async function login() {
		if (!email || !password) {
			error = true;
			return;
		}
		const res = await authHandlers.login(email, password);
		if (res) {
			goto('/');
		} else {
			error = true;
		}
	}
</script>

<a
	href="/account/register"
	class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8 font-inknut"
	>Sign Up
</a>

<div class="flex font-inknut">
	<div class="bg-black w-[2rem]" />
	<div class="w-[calc(100%-2rem)] h-screen flex items-center justify-center flex-col pb-20">
		<img alt="The project logo" src={logo} />
		<form on:submit|preventDefault={login} class="py-2 mb-2 mt-10 gap-2 flex flex-col">
			<Input type="email" label="Email" name="Email" bind:value={email} />
			<Input type="password" label="Password" name="password" bind:value={password} />
			{#if error}
				<span class="text-red-500 text-center">Wrong password or username</span>
			{/if}
			<button class="px-6 rounded-sm mx-auto mt-4 bg-primary hover:bg-opacity-80 text-white py-2"
				>Sign In</button
			>
		</form>
	</div>
</div>
