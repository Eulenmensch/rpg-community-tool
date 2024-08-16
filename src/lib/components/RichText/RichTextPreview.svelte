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

	.rich-text-preview :global(h1) {
		font-size: 1.3rem;
		font-weight: 800;
		margin-bottom: 0.6rem;
		margin-top: 1.1rem;
		color: #276a78;
	}
	.rich-text-preview :global(h2) {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 4px;
	}
	.rich-text-preview :global(ul) {
		padding: 0 1rem;
		margin-left: 1.25rem;
		margin-top: 1.1rem;
		margin-bottom: 1.1rem;
		list-style-type: disc;
	}
	.rich-text-preview :global(ol) {
		padding: 0 1rem;
		margin-left: 1.25rem;
		margin-top: 1.1rem;
		margin-bottom: 1.1rem;
		list-style-type: decimal;
	}
</style>
