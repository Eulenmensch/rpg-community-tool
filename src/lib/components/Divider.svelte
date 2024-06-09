<script lang="ts">
	import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let label: String;
</script>

<div class="flex items-center text-center text-xl font-bold font-schmaltzy">
	<div class="flex-grow h-1 w-full bg-black relative rounded-full" />
	<Fa class="fa-fw text-3xl -ml-2" icon={faCaretLeft} />
	<span class="mx-12 whitespace-nowrap">{label}</span>
	<Fa class="fa-fw text-3xl -mr-2" icon={faCaretRight} />

	<div class="flex-grow h-1 w-full bg-black relative rounded-full" />
</div>
