import { type Writable, writable } from 'svelte/store';
import type { ICampaign } from '../../Interfaces';

export const campaignStore: Writable<{
	campaigns: ICampaign[];
	selectedCamapaign: string | null;
}> = writable({
	campaigns: [],
	selectedCamapaign: null,
});
