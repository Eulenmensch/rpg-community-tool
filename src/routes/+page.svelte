<script lang="ts">
	import { authStore } from '$lib/store/authStore';
	import { campaignStore } from '$lib/store/campaignStore';

	let username: string;
	authStore.subscribe((user) => {
		username = user.data.username;
	});

	let campaign = $campaignStore.campaigns.find((c) => c.id === $authStore.data.active_campaign);
</script>

<div class="p-4 font-inknut">
	<div class="flex py-2 flex-col">
		<h1 class="text-lg font-semibold mb-6">Protected Landing - Dashboard page</h1>
		<div class="flex flex-col p-2 rounded bg-slate-100 w-72">
			<span class="font-semibold mb-1">{campaign?.name}</span>
			<div class="flex flex-col">
				<span>Campaign code</span>
				<span>{campaign?.code}</span>
			</div>
			<span>Players:</span>
		</div>
	</div>
</div>
