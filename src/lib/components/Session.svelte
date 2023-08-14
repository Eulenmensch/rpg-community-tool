<script lang="ts">
	import type { ISession } from '../../Interfaces';

	export let session: ISession;
</script>

<div class="bg-dark text-white py-3 px-5 rounded flex justify-between">
	<p>{session.name}</p>
	<div class="flex gap-3">
		<p>{session.date}</p>
		<p>0/{session.slots}</p>
	</div>
</div>
