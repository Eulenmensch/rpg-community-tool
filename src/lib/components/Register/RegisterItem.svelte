<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
	export let currentStep: number;
	export let step: number;
	export let label: string;

	function handleBack() {
		if (!(currentStep > step) || currentStep >= 3) return;
		currentStep = step;
	}
</script>

<button
	disabled={currentStep <= step || currentStep >= 3}
	class={`rounded-full relative flex items-center gap-8 px-6 py-2 text-left `}
	on:click={handleBack}
>
	<div
		class="{step === currentStep
			? 'translate-y-0 visible duration-500'
			: currentStep > step
			? 'translate-y-full invisible duration-0'
			: '-translate-y-full invisible duration-0'}
			bg-primary rounded-full absolute inset-0 transition-transform ease-in-out flex items-center gap-8 text-left px-8 py-2 whitespace-nowrap"
	>
		<Fa class="text-lg" icon={faCircle} />
		<span>{label}</span>
	</div>
	{#if currentStep > step}
		<Fa class="text-lg text-primary" icon={faCheckCircle} />
	{/if}
	{#if currentStep <= step}
		<Fa class="text-lg {currentStep < step && 'opacity-50'}" icon={faCircle} />
	{/if}
	<span class=" {currentStep < step && 'opacity-50'} ">{label}</span>
</button>
