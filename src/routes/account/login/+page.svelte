<script>
	import logo from '$lib/images/logo.svg';
	import { authStore } from '$lib/store/authStore';
</script>

<div class="w-screen h-screen flex items-center justify-center flex-col pb-20">
	<a
		href="/account/register"
		class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8"
		>Sign Up
	</a>
	<img alt="The project logo" src={logo} />
	<div class="py-2 mb-2 mt-10 gap-2 flex flex-col">
		<div class="flex flex-col">
			<label class="" for="">Email</label>
			<input
				class="outline-primary border-gray border-2 rounded-sm px-3 py-2 w-72"
				name="email"
				type="email"
			/>
		</div>
		<div class="flex flex-col">
			<label for="">Password</label>
			<input
				class="outline-primary border-gray border-2 rounded-sm px-3 py-2 w-72"
				type="password"
			/>
		</div>
	</div>
	<button class="px-6 rounded-sm bg-black hover:bg-opacity-80 text-white py-2">Sign In</button>
	<button class="px-6 rounded-sm text-black border border-gray py-2 mt-8 hover:bg-slate-100">
		Sign In with Google
	</button>
</div>
