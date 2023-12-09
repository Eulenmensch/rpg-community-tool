<script lang="ts">
	import type { ICampaign, IPersona } from '../../../Interfaces';
	export let campaign: ICampaign;
	export let personasInCampaign: IPersona[];
</script>

<div class="bg-black text-white py-4 px-7 rounded-xl w-full flex">
	<span>{campaign.name}</span>
	<div class="ml-auto">{personasInCampaign?.length}</div>
</div>
