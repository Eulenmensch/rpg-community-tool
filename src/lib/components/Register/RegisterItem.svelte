<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
	export let currentStep: number;
	export let step: number;
	export let label: string;
</script>

<li class={`rounded-full relative flex items-center gap-8 px-6 py-2 text-left `}>
	<div
		class={`${
			step === currentStep
				? 'translate-y-0 visible duration-500'
				: '-translate-y-[100%] invisible duration-0'
		} bg-primary rounded-full absolute inset-0 transition-transform ease-in-out  flex items-center gap-8 text-left px-8 py-2 whitespace-nowrap`}
	>
		<Fa class="text-lg" icon={faCircle} />
		<span>{label}</span>
	</div>
	{#if currentStep > step}
		<Fa class="text-lg text-primary" icon={faCheckCircle} />
	{/if}
	{#if currentStep <= step}
		<Fa class="text-lg" icon={faCircle} />
	{/if}
	<span>{label}</span>
</li>
