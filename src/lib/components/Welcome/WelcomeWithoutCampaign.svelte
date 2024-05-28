<script>
	import { goto } from '$app/navigation';
	import { navHeight } from '$lib/helpers';
	import Button from '$lib/components/Button.svelte';
</script>

<div
	style={`height: calc(100vh - ${navHeight})`}
	class="flex w-full items-center justify-center text-center flex-col gap-14"
>
	<div class="flex flex-col gap-4">
		<h1 class="text-6xl font-inknut leading-snug flex flex-col font-black">
			<span>No Campaign selected</span>
		</h1>
		<p class="max-w-[60ch] text-balance">
			It seems like you do not have any campaign selected or did not create a campaign yet. Go ahead
			and manage your campaigns
		</p>
	</div>
	<Button
		handleClick={() => {
			goto('/campaign');
		}}
	>
		Go to campaigns
	</Button>
</div>
