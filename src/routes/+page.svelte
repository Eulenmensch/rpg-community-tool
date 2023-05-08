<script lang="ts">
	import { authHandlers, authStore } from '$lib/store/authStore';

	let username: string;
	authStore.subscribe((user) => {
		username = user.data.username;
	});
</script>

<div class="p-4 font-inknut">
	<div class="flex py-2">
		<h1 class="text-lg font-semibold">Protected Landing - Dashboard page</h1>
	</div>
</div>
