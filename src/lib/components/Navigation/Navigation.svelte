<script lang="ts">
	import { authHandlers, authStore } from '$lib/store/authStore';
	import CampaignSelector from './CampaignSelector.svelte';
	import { navHeight } from '$lib/helpers';
	import PersonaSelector from './PersonaSelector.svelte';

	let username: string;
	authStore.subscribe((user) => {
		username = user.data.username;
	});
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
	<div class="flex">
		<CampaignSelector />
		<PersonaSelector />
		<span class="mx-4">Logged in as: {username}</span>
		<button class="bg-primary text-white px-2 rounded-sm" on:click={() => authHandlers.logout()}
			>Logout</button
		>
	</div>
</div>
