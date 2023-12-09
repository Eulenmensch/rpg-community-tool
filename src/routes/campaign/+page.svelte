<script>
	import { goto } from '$app/navigation';
	import CampaignWithPersonas from '$lib/components/Campaign/CampaignWithPersonas.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<section class="">
	<div class="mt-20 flex">
		<div class="mx-auto w-1/3 flex flex-col gap-2">
			<CampaignWithPersonas />
			<CampaignWithPersonas />
			<CampaignWithPersonas />
			<button
				on:click={() => goto('/campaign/create')}
				class="border rounded-full p-3 border-dark mx-auto mt-10 hover:bg-primary hover:border-primary hover:text-white"
			>
				<Fa icon={faPlus} />
			</button>
		</div>
	</div>
</section>
