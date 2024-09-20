import { faClock, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import type { DateFormat, IPersona, IPlayable } from '../Interfaces';
import { get } from 'svelte/store';
import { authStore } from './store/authStore';
import { personaHandlers } from './store/personaStore';
import { campaignHandlers, campaignStore } from './store/campaignStore';
import { sessionHandlers, sessionStore } from './store/sessionStore';

export const navHeight = '75px';

export const sessionStatusToIcon = {
	available: faLockOpen,
	ongoing: faClock,
	closed: faLock,
};

export function formatDateAsDisplayVersion(inputDate: DateFormat) {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	};
	const formattedDate = new Date(inputDate).toLocaleDateString('en-GB', options);
	return formattedDate.replace(/\//g, '.');
}

export async function switchActivePersona(persona: IPersona) {
	if (!persona?.id) return;
	const authStoreRef = get(authStore);

	personaHandlers.switchActivePersona(authStoreRef.data.uid, persona?.id);

	const newActiveCampaign = await campaignHandlers.getCampaign(persona?.campaignId);

	authStore.update((store) => {
		store.data.active_persona = persona;
		store.data.active_campaign = persona?.campaignId;
		return store;
	});

	campaignStore.update((store) => {
		store.selectedCampaign = persona?.campaignId;
		store.campaign = newActiveCampaign;
		return store;
	});

	const sessions = await sessionHandlers.getSessionsByCampaign(persona?.campaignId);
	sessionStore.set(sessions);
}

export function userOwnsCampaign() {
	const campaignStoreRef = get(campaignStore);
	const authStoreRef = get(authStore);

	return campaignStoreRef.campaign?.owner_id === authStoreRef?.data?.uid;
}

export function createDefaultPlayable(): IPlayable {
	return {
		color: 'black',
		coordinates: {
			lat: 0,
			long: 0,
		},
		description: '',
		iconType: 'default',
		name: '',
		type: 'location',
	};
}
