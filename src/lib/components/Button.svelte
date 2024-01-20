<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let className: string | null = null;
	export let handleClick: () => void = () => {};
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	{type}
	on:click={handleClick}
	class={twMerge(
		'bg-primary rounded-md text-white font-bold font-schmaltzy px-5 py-3 flex w-min whitespace-nowrap hover:bg-primary-400',
		className,
	)}
>
	<slot />
</button>
