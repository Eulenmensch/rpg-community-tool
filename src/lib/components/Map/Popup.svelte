<script lang="ts">
	import type { IPlayable } from '../../../Interfaces';
	export let marker: IPlayable;
</script>

<div class={` text-center ${marker.type === 'mission' ? 'bg-green-500' : 'bg-yellow-500'}`}>
	<p class="">{marker.name}</p>
	<p>{marker.description}</p>
	<p>Type: {marker.type}</p>
</div>
