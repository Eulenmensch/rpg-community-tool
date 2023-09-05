<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog class="my-auto mx-auto inset-0 bg-transparent" bind:this={dialog} on:close>
	<slot />
</dialog>

<style>
	dialog::backdrop {
		transition: backdrop-filter 0.5s ease;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(3px);
	}
</style>
