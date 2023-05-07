<script lang="ts">
	import { authHandlers, authStore } from "$lib/store/authStore";

    let username : string
    authStore.subscribe(user => {
        username = user.data.username
    })

</script>


<div class="p-4 font-inknut">
    <div class="flex py-2">
        <h1 class="text-lg  font-semibold">Campaign page - specific and with selected campaign / map</h1>
        <div class="ml-auto">
            <span class="mx-4">Logged in as: {username}</span>
            <button class="bg-primary text-white px-2 rounded-sm" on:click={() => authHandlers.logout()}>Logout</button>
        </div>
    </div>
    <a href="/">Go to Landing Page</a>
</div>
