<script lang="ts">
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { IPersona } from '../../Interfaces';

	export let persona: IPersona;
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

	const sizeClasses = {
		xs: 'size-8 text-xs',
		sm: 'size-10 text-sm',
		md: 'size-12 text-md',
		lg: 'size-14 text-lg',
	};

	$: sizeClass = sizeClasses[size];
</script>

<div class="{sizeClass} rounded-full flex items-center justify-center">
	{#if persona.imageUrl}
		<img src={persona.imageUrl} alt={persona.name} class="{sizeClass} rounded-full object-cover" />
	{:else}
		<div
			class="{sizeClass} rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center"
		>
			<Fa icon={faUser} class="text-white" />
		</div>
	{/if}
</div>
