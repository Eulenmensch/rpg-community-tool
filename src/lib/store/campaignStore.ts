import { type Writable, writable } from 'svelte/store';
import type { ICampaign, IPlayable } from '../../Interfaces';
import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	getDoc,
	or,
} from 'firebase/firestore';
import { theUnknownPlayables, unePlayables } from '../../utils';
import { authHandlers, authStore } from './authStore';
import { arrayUnion } from 'firebase/firestore';

export const campaignStore: Writable<{
	campaigns: ICampaign[];
	selectedCampaign: string | null;
}> = writable({
	campaigns: [],
	selectedCampaign: null,
});

export const campaignHandlers = {
	createCampaign: async (
		userId: string,
		type: 'Une' | 'TheUnknown',
		name: string,
	): Promise<ICampaign> => {
		const campaignToCreate: ICampaign = {
			user_id: userId,
			name: name,
			playables: type == 'Une' ? unePlayables : theUnknownPlayables,
			users: [],
		};
		const campaignRef = await addDoc(collection(db, `campaign`), campaignToCreate);
		await authHandlers.update(userId, campaignRef.id);
		return { ...campaignToCreate, id: campaignRef.id };
	},
	createPlayable: async (playable: IPlayable, campaignId: string) => {
		const docRef = doc(db, `campaign/${campaignId}`);
		updateDoc(docRef, { playables: arrayUnion(playable) });
	},
	joinCampaignWithoutPersona: async (campaignId: string, userId: string) => {
		const campaignDocRef = doc(db, `campaign/${campaignId}`);
		const campaignDocData = await getDoc(campaignDocRef);
		updateDoc(campaignDocRef, { users: arrayUnion(userId) });
		authHandlers.update(userId, campaignId, true);
		const docDataDoesExist = campaignDocData.exists();
		if (docDataDoesExist) {
			await authHandlers.update(userId, campaignId);
			return { id: campaignId, ...campaignDocData.data() } as ICampaign;
		}

		return null;
	},
	getAllCampaignsForUser: async (userId: string): Promise<ICampaign[]> => {
		const campaignCollectionRef = collection(db, 'campaign');
		const campaignQuery = query(
			campaignCollectionRef,
			or(where('user_id', '==', userId), where('users', 'array-contains', userId)), // change this to subcollection
		);
		const snapshot = await getDocs(campaignQuery);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ICampaign) }));
	},
};
