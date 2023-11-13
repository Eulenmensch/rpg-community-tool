<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	on:click={() => dialog.close()}
	class="my-auto w-full mx-auto inset-0 bg-transparent"
	bind:this={dialog}
	on:close
>
	<div class="flex mx-auto" on:click|stopPropagation on:mousedown>
		<slot />
	</div>
</dialog>

<style>
	dialog::backdrop {
		transition: backdrop-filter 0.5s ease;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(3px);
	}
</style>
