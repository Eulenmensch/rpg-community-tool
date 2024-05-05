<script lang="ts">
	import { navHeight } from '$lib/helpers';
	import PersonaSelector from './PersonaSelector.svelte';
	import logo from '$lib/images/Logo Stacked.png';
	import { page } from '$app/stores';
</script>

<div
	id="nav"
	style={`height: ${navHeight}`}
	class="bg-black py-9 text-white px-8 flex justify-between font-inknut items-center"
>
	<a href="/">
		<img src={logo} alt="Questseeker-Logo" />
	</a>
	<ol class="flex gap-4">
		<li>
			<a href="/" class={$page.route.id == '/' ? `` : ''}>Dashboard</a>
		</li>
		<li><a href="/map" class={$page.route.id == '/map' ? `` : ''}>Map</a></li>
	</ol>
	<div class="flex">
		<PersonaSelector />
	</div>
</div>
