<script lang="ts">
	import {
		faBold,
		faExpand,
		faItalic,
		faList,
		faListOl,
		faMinimize,
		faUnderline,
	} from '@fortawesome/free-solid-svg-icons';
	import { Editor } from '@tiptap/core';
	import BulletList from '@tiptap/extension-bullet-list';
	import ListItem from '@tiptap/extension-list-item';
	import Placeholder from '@tiptap/extension-placeholder';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';

	let element: HTMLElement;
	let editor: Editor;
	let expanded = false;
	export let content = '<p>Hello World! 🌍️ </p>';

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				BulletList,
				ListItem,
				StarterKit,
				Underline,
				Placeholder.configure({
					emptyEditorClass: 'is-editor-empty',

					// Use different placeholders depending on the node type:
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'Write a heading';
						}
						if (node.type.name === 'paragraph') {
							return 'Write a paragraph';
						}
						if (node.type.name === 'bulletList') {
							return 'List';
						}
						if (node.type.name === 'orderedList') {
							return 'List';
						}

						return 'Can you add some further context?';
					},
				}),
			],
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

<div
	class={expanded ? 'bg-white absolute inset-0 transition-all z-20 ' : 'transition-all bg-white '}
>
	{#if editor}
		<div
			class="flex flex-row items-center bg-slate-100 w-full py-1 px-2 gap-4 z-30 {expanded
				? 'fixed'
				: ''}"
		>
			<div class="flex gap-1 items-center">
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('heading', { level: 1 })}
				>
					H1
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('heading', { level: 2 })}
				>
					H2
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().setParagraph().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('paragraph') &&
						!editor.isActive('bulletList') &&
						!editor.isActive('orderedList')}
				>
					P
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleBulletList().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('bulletList')}
				>
					<Fa class="fa-fw text-lg" icon={faList} />
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleOrderedList().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('orderedList')}
				>
					<Fa class="fa-fw text-lg" icon={faListOl} />
				</button>
			</div>
			<div class="w-[1px] bg-slate-300 h-10" />

			<div class="flex items-center gap-1">
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleBold().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('bold')}
				>
					<Fa class="fa-fw text-lg" icon={faBold} />
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleItalic().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('italic')}
				>
					<Fa class="fa-fw text-lg" icon={faItalic} />
				</button>
				<button
					type="button"
					on:click={() => editor.chain().focus().toggleUnderline().run()}
					class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm"
					class:active={editor.isActive('underline')}
				>
					<Fa class="fa-fw text-lg" icon={faUnderline} />
				</button>
			</div>
			<button
				type="button"
				on:click={() => (expanded = !expanded)}
				class="p-2 size-10 flex items-center justify-center hover:bg-slate-200 rounded-sm ml-auto"
			>
				{#if !expanded} <Fa class="fa-fw text-lg" icon={faExpand} />{/if}
				{#if expanded}
					<Fa class="fa-fw text-lg" icon={faMinimize} />
				{/if}
			</button>
		</div>
	{/if}

	<div
		bind:this={element}
		class="tiptap-editor flex-grow {expanded ? 'w-2/3 mx-auto mt-16' : 'border border-r-2'}"
	/>
</div>

<style>
	/*ATTENTION! When editing how content is displayed inside the editor we need to edit it inside RichTextPreview as well!*/

	button.active {
		background: black;
		color: white;
	}

	:global(.tiptap-editable) {
		padding: 8px;
		min-height: 100px;
		min-width: 200px;
		outline: none;
	}
	.tiptap-editor :global(h1) {
		font-size: 1.3rem;
		font-weight: 800;
		margin-bottom: 0.6rem;
		margin-top: 1.1rem;
		color: #276a78;
	}
	.tiptap-editor :global(h2) {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 4px;
	}
	.tiptap-editor :global(.is-editor-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	.tiptap-editor :global(.is-empty::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	.tiptap-editor :global(ul) {
		padding: 0 1rem;
		margin-left: 1.25rem;
		margin-top: 1.1rem;
		margin-bottom: 1.1rem;
		list-style-type: disc;
	}
	.tiptap-editor :global(ol) {
		padding: 0 1rem;
		margin-left: 1.25rem;
		margin-top: 1.1rem;
		margin-bottom: 1.1rem;
		list-style-type: decimal;
	}
</style>
