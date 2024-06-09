<script>
	import { goto } from '$app/navigation';
	import { navHeight } from '$lib/helpers';
	import { authStore } from '$lib/store/authStore';
	import Button from '$lib/components/Button.svelte';
	import { campaignStore } from '$lib/store/campaignStore';

	$: campaign = $campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign);
</script>

<div
	style={`height: calc(100vh - ${navHeight})`}
	class="flex w-full items-center justify-center text-center flex-col gap-20"
>
	<h1 class="text-6xl font-inknut leading-snug flex flex-col font-black">
		<span>Welcome to</span>
		<span>{campaign?.name}!</span>
	</h1>
	<div class="flex flex-col gap-3 items-center">
		<h2 class="text-3xl">Would you like to create a Character?</h2>
		<p class="text-dark/60 text-lg max-w-[50ch]">
			To play, you need at least one character but you can also browse the campaign first and create
			one later
		</p>
	</div>
	<div class="flex gap-8 text-2xl">
		<Button handleClick={() => goto(`/character/create?campaignId=${campaign?.id}`)}>Create</Button>
	</div>
</div>
