<script>
	import { authHandlers } from '$lib/store/authStore';

	let email = '';
	let password = '';
	let confirmPassword = '';

	//TODO: Error Handling, Duplicate users, Loading state
	//TODO: Add Username
	async function handleRegister() {
		authHandlers.register(email, password);
	}
</script>

<a
	href="/account/login"
	class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8"
	>Sign In
</a>
<div class="w-screen h-screen items-center flex justify-center flex-col">
	<h1 class="text-lg font-semibold">Placeholder Register Page</h1>
	<form on:submit|preventDefault={handleRegister} class="flex flex-col">
		<label for="username">Username</label>
		<input placeholder="Username" class="border border-gray" name="username" type="text" />
		<label for="email">Email</label>
		<input
			placeholder="Email"
			bind:value={email}
			class="border border-gray"
			name="email"
			type="email"
		/>
		<label for="password">Password</label>
		<input
			placeholder="Password"
			bind:value={password}
			class="border border-gray"
			name="password"
			type="password"
		/>
		<label for="confirmPassword">Confirm Password</label>
		<input
			placeholder="Confirm Password"
			bind:value={confirmPassword}
			class="border border-gray"
			name="confirmPassword"
			type="password"
		/>
		<button type="submit">Create Account</button>
	</form>
</div>
