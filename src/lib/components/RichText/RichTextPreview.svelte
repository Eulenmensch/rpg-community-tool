<script lang="ts">
	export let content: string | undefined;
</script>

{#if content}
	<div class="rich-text-preview">
		{@html content}
	</div>
{/if}
{#if !content}
	<div class="opacity-80">No Description yet</div>
{/if}

<style>
	.rich-text-preview {
		font-family: inherit;
	}

	.rich-text-preview :global(h1) {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.rich-text-preview :global(h2) {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.rich-text-preview :global(p) {
		margin-bottom: 8px;
	}

	.rich-text-preview :global(strong) {
		font-weight: bold;
	}

	.rich-text-preview :global(em) {
		font-style: italic;
	}
</style>
