import { type Writable, writable } from 'svelte/store';
import type { ICampaign, IPlayable, ISession } from '../../Interfaces';
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
import { v4 as uuidv4 } from 'uuid';
import { arrayUnion } from 'firebase/firestore';

export const campaignStore: Writable<{
	campaigns: ICampaign[];
	selectedCamapaign: string | null;
}> = writable({
	campaigns: [],
	selectedCamapaign: null,
});

export const campaignHandlers = {
	createCampaign: async (
		userId: string,
		type: 'Une' | 'TheUnknown',
		name: string,
	): Promise<ICampaign> => {
		const campaignCode = uuidv4();
		const campaignToCreate: ICampaign = {
			user_id: userId,
			name: name,
			playables: type == 'Une' ? unePlayables : theUnknownPlayables,
			code: campaignCode,
			users: [],
		};
		const campaignRef = await addDoc(collection(db, `campaign`), campaignToCreate);
		await authHandlers.update(userId, campaignRef.id);
		return { ...campaignToCreate, id: campaignRef.id };
	},
	createPlayable: async (playable: IPlayable, campaignId: string): Promise<any> => {
		const docRef = doc(db, `campaign/${campaignId}`);
		updateDoc(docRef, { playables: arrayUnion(playable) });
	},
	joinCampaign: async (campaignCode: string, userId: string): Promise<ICampaign | null> => {
		const docRef = doc(db, `campaign/${campaignCode}`);
		const docData = await getDoc(docRef);
		updateDoc(docRef, { users: arrayUnion(userId) });
		const docDataDoesExist = docData.exists();
		if (docDataDoesExist) {
			await authHandlers.update(userId, docData.id);
			return { id: docData.id, ...docData.data() } as ICampaign;
		}
		return null;
	},
	getAllCampaignsForUser: async (userId: string): Promise<ICampaign[]> => {
		const campaignCollectionRef = collection(db, 'campaign');
		const campaignQuery = query(
			campaignCollectionRef,
			or(where('user_id', '==', userId), where('users', 'array-contains', userId)),
		);
		const snapshot = await getDocs(campaignQuery);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ICampaign) }));
	},
};
