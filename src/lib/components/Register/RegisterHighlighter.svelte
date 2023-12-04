<script lang="ts">
	import RegisterItem from './RegisterItem.svelte';
	import logo from '$lib/images/logo_white.svg';
	export let currentStep: number;
</script>

<div class="bg-black h-screen text-white flex items-center flex-col py-14">
	<img alt="The project logo" src={logo} class="w-full px-24" />
	<ol class="flex gap-5 flex-col text-base my-auto">
		<RegisterItem label="Your Details" step={1} bind:currentStep />
		<RegisterItem label="Your Password" step={2} bind:currentStep />
		<RegisterItem label="Your Campaign" step={4} bind:currentStep />
	</ol>
</div>
