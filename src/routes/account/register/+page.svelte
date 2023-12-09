<script>
	import CreateCampaign from '$lib/components/Register/CreateCampaign.svelte';
	import Details from '$lib/components/Register/Details.svelte';
	import Password from '$lib/components/Register/Password.svelte';
	import RegisterHighlighter from '$lib/components/Register/RegisterHighlighter.svelte';

	let email = '';
	let username = '';
	let currentStep = 1;
</script>

<a
	href="/account/login"
	class="absolute px-6 py-2 rounded-sm bg-primary hover:bg-primary-400 text-white right-8 top-8 font-inknut"
	>Sign In
</a>
<div class="flex font-inknut">
	<div class={`transition-all ease-in-out duration-[2000ms] w-1/4`}>
		<RegisterHighlighter bind:currentStep />
	</div>

	<div class="w-3/4 h-screen items-center flex justify-center flex-col">
		{#if currentStep === 1}
			<Details bind:username bind:email bind:currentStep />
		{/if}
		{#if currentStep === 2}
			<Password {username} {email} bind:currentStep />
		{/if}
		{#if currentStep === 3}
			<CreateCampaign />
		{/if}
	</div>
</div>
