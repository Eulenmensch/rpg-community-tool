<script lang="ts">
	import RegisterItem from './RegisterItem.svelte';
	export let currentStep: number;
</script>

<div class="bg-black h-screen text-white flex items-center justify-center">
	<ol class="flex gap-5 flex-col text-base">
		<RegisterItem label="Your Details" step={1} {currentStep} />
		<RegisterItem label="Your Password" step={2} {currentStep} />
		<RegisterItem label="Your Role" step={3} {currentStep} />
		<RegisterItem label="Your Campaign" step={4} {currentStep} />
	</ol>
</div>
