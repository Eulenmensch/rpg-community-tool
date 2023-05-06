<script lang="ts">
	import Input from '$lib/components/Register/Input.svelte';
	import logo from '$lib/images/logo.svg';
	import { authStore } from '$lib/store/authStore';

	let email : string;
	let password : string;

</script>

<a
	href="/account/register"
	class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8 font-inknut"
	>Sign Up
</a>

<div class="flex font-inknut">
	<div class="bg-black w-[2rem]"/>
	<div class="w-[calc(100%-2rem)] h-screen flex items-center justify-center flex-col pb-20">
		<img alt="The project logo" src={logo} />
		<div class="py-2 mb-2 mt-10 gap-2 flex flex-col">
			<Input type="email" label="Email" name="Email" bind:value={email}/>
			<Input type="password" label="Password" name="password" bind:value={password}/>
		</div>
		<button class="px-6 rounded-sm bg-primary hover:bg-opacity-80 text-white py-2">Sign In</button>
	</div>
</div>


