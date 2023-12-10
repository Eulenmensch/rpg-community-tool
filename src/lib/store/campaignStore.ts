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
import { authHandlers } from './authStore';
import { arrayUnion } from 'firebase/firestore';

export const campaignStore: Writable<{
	campaigns: ICampaign[];
	selectedCampaign: string | null;
}> = writable({
	campaigns: [],
	selectedCampaign: null,
});

export const campaignHandlers = {
	getCampaign: async (campaignId: string): Promise<ICampaign> => {
		const campaignDocRef = doc(db, `campaign/${campaignId}`);
		const docSnapshot = await getDoc(campaignDocRef);
		return docSnapshot.data() as ICampaign;
	},
	createCampaign: async (
		owner_id: string,
		type: 'Une' | 'TheUnknown',
		name: string,
	): Promise<ICampaign> => {
		const campaignToCreate: ICampaign = {
			owner_id: owner_id,
			name: name,
			playables: type == 'Une' ? unePlayables : theUnknownPlayables,
			users: [],
		};
		const campaignRef = await addDoc(collection(db, `campaign`), campaignToCreate);
		await authHandlers.update(owner_id, campaignRef.id);
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
	getAllCampaignsForUser: async (owner_id: string): Promise<ICampaign[]> => {
		const campaignCollectionRef = collection(db, 'campaign');
		const campaignQuery = query(
			campaignCollectionRef,
			or(where('owner_id', '==', owner_id), where('users', 'array-contains', owner_id)),
		);
		const snapshot = await getDocs(campaignQuery);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ICampaign) }));
	},
};
