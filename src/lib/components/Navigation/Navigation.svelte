<script lang="ts">
	import { navHeight } from '$lib/helpers';
	import PersonaSelector from './PersonaSelector.svelte';
	import logo from '$lib/images/Logo Stacked.png';
	import bottomBar from '$lib/images/bottom-bar.svg';
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
			<a href="/" class={$page.route.id == '/' ? `underline` : ''}>Dashboard</a>
		</li>
		<li><a href="/map" class={$page.route.id == '/map' ? `underline` : ''}>Map</a></li>
		<li>
			<a href="/data" class={$page.route.id == '/data' ? `underline` : ''}>Data</a>
		</li>
	</ol>
	<div class="flex">
		<PersonaSelector />
	</div>

	<div class="fixed bottom-0 left-0 right-0 w-full z-[99999999]">
		<img src={bottomBar} alt="bottomBar" class="w-full bottom-0" />
	</div>
</div>
