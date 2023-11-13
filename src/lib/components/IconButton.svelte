<script>
	import Fa from 'svelte-fa';
</script>

<button
	on:click={handleClick}
	class="w-6 h-6 flex items-center justify-center hover:bg-white hover:text-primary rounded"
	><Fa class="text-xl" icon={faEdit} />
</button>
