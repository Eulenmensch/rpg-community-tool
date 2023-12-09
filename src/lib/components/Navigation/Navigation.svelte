<script lang="ts">
	import { authHandlers, authStore } from '$lib/store/authStore';
	import { navHeight } from '$lib/helpers';
	import PersonaSelector from './PersonaSelector.svelte';
</script>

<div
	id="nav"
	style={`height: ${navHeight}`}
	class="bg-black py-3 text-white px-8 flex justify-between font-inknut items-center"
>
	<ol class="flex gap-4">
		<li><a href="/">Dashboard</a></li>
		<li><a href="/map">Map</a></li>
	</ol>
	<div class="flex gap-4">
		<PersonaSelector />
	</div>
</div>
