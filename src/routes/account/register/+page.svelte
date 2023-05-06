<script>
	import { beforeNavigate } from '$app/navigation';
	import Campaign from '$lib/components/Register/Campaign.svelte';
	import Details from '$lib/components/Register/Details.svelte';
	import Password from '$lib/components/Register/Password.svelte';
	import RegisterHighlighter from '$lib/components/Register/RegisterHighlighter.svelte';
	import Role from '$lib/components/Register/Role.svelte';
	import { onMount, onDestroy } from 'svelte';
	
	/* export let data;
	$: pathname = data.pathname */


	let email = '';
	let username = '';
	let currentStep = 1;
	$: mounted = true

	/* onMount(async () => {
		console.log(mounted)
		console.log("Mounting")
		mounted = true
	}); 

	onDestroy(async () => {
		console.log("DESTROYING")
		mounted = false
	})
 */
</script>

<a
	href="/account/login"
	class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8 font-inknut"
	>Sign In
</a>
<div class="flex font-inknut">
	<div class={`transition-all ease-in-out duration-[2000ms] ${mounted ? "w-1/4" : "w-[100px]"}`}>
		<RegisterHighlighter {currentStep} />
	</div>
	
	<div class="w-3/4 h-screen items-center flex justify-center flex-col">
		{#if currentStep === 1}
			<Details bind:username bind:email bind:currentStep />
		{/if}
		{#if currentStep === 2}
			<Password {username} {email} bind:currentStep />
		{/if}
		{#if currentStep === 3}
			<Role />
		{/if}
		{#if currentStep === 4}
			<Campaign />
		{/if}
	</div>
</div>

