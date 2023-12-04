<script lang="ts">
	import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let value: number;
	export let max: number = 99999;
	export let min: number = -9999;

	//TODO: Dont allow bigger numbers in input onchange
</script>

<div class="flex items-center">
	<button
		on:click={() => {
			value = Math.max(min, value - 1);
		}}
		type="button"
		disabled={min === value}
		class="bg-gray-400 w-10 h-10 hover:bg-gray-500 flex items-center justify-center text-white
        {min == value ? 'opacity-30' : 'bg-primary/80'}"
	>
		<Fa icon={faMinus} />
	</button>
	<input
		bind:value
		class="border border-gray h-10 w-20 flex items text-center justify-center"
		name="slots"
		type="number"
		required
	/>
	<button
		on:click={() => {
			value = Math.min(max, value + 1);
		}}
		disabled={max === value}
		type="button"
		class="bg-gray-400 w-10 h-10 hover:bg-gray-500 flex items-center justify-center text-white
        {max == value ? 'opacity-30' : 'bg-primary/80'}"
	>
		<Fa icon={faPlus} />
	</button>
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
