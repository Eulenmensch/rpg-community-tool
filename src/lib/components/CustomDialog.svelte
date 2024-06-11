<script lang="ts">
	import { flyAndScale } from '$lib/utils';
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';

	//--- Props ---
	export let open = false;
</script>

<Dialog.Root bind:open on:close>
	<Dialog.Portal class="z-[999999999999]">
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			transition={flyAndScale}
			transitionConfig={{ duration: 150 }}
			class="fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] rounded-card-lg outline-none md:w-auto overflow-y-auto shadow-white shadow rounded-lg"
		>
			<slot name="content" />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
