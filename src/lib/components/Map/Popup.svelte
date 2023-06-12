<script lang="ts">
	import type { IPlayable } from '../../../Interfaces';
	export let marker: IPlayable;
</script>

<div class="bg-red-200 text-center">
	<p class="">{marker.name}</p>
	<p>{marker.description}</p>
</div>
