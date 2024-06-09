<script lang="ts">
	import type { IPlayable } from '../../../Interfaces';
	export let marker: IPlayable;
</script>

<div
	class={`text-center flex flex-col
	 ${marker.type === 'mission' ? '' : ''}`}
>
	<h3
		class="text-3xl font-bold top-6 backdrop-blur-[1px] bg-white/70 font-schmaltzy absolute left-7 right-7 mx-auto items-center"
	>
		{marker.name}
	</h3>
	<p class=" w-full text-lg pt-12 text-left">{marker.description}</p>
</div>
