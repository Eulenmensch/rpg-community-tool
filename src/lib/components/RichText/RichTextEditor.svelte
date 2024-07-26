<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let element: HTMLElement;
	let editor: Editor;
	export let content = '<p>Hello World! 🌍️ </p>';

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				dispatch('update', editor.getHTML());
			},
			editorProps: {
				attributes: {
					class: 'tiptap-editable',
				},
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div>
	{#if editor}
		<div class="flex flex-row items-center gap-4 bg-slate-100 w-full p-3">
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class:active={editor.isActive('heading', { level: 1 })}
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
			>
				H2
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class:active={editor.isActive('paragraph')}
			>
				P
			</button>
			<div class="ml-8">
				<button
					on:click={() => editor.chain().focus().toggleBold().run()}
					class:active={editor.isActive('bold')}
				>
					Bold
				</button>
				<button
					on:click={() => editor.chain().focus().toggleItalic().run()}
					class:active={editor.isActive('italic')}
				>
					Italic
				</button>
			</div>
		</div>
	{/if}

	<div bind:this={element} class="tiptap-editor" />
</div>

<style>
	button.active {
		background: black;
		color: white;
	}

	:global(.tiptap-editable) {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 8px;
		min-height: 100px;
		min-width: 200px;
		outline: none;
	}
	.tiptap-editor :global(h1) {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 8px;
	}
	.tiptap-editor :global(h2) {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 4px;
	}

	/* .tiptap-editor :global(p) {
	} */
</style>
