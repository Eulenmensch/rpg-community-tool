import { type Writable, writable } from 'svelte/store';
import type { ICampaign } from '../../Interfaces';
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
	createCampaign: async (userId: string, type: string, name: string): Promise<ICampaign> => {
		const campaignCode = uuidv4();
		const campaignToCreate: ICampaign = {
			user_id: userId,
			name: name,
			playables: type == 'Une' ? unePlayables : theUnknownPlayables,
			code: campaignCode,
			users: [],
		};
		const res = await addDoc(collection(db, `campaign`), campaignToCreate);
		await authHandlers.update(userId, res.id);
		return { ...campaignToCreate, id: res.id };
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
	getAllCampaignsForUser: async (userId: string): Promise<ICampaign[] | null> => {
		const campaignRef = collection(db, 'campaign');
		const q = query(
			campaignRef,
			or(where('user_id', '==', userId), where('users', 'array-contains', userId)),
		);
		const snapshot = await getDocs(q);

		return new Promise((resolve, reject) => {
			if (!snapshot.empty) {
				const myArray: any[] = [];
				snapshot.forEach((doc) => {
					const data: any = doc.data();
					myArray.push({
						id: doc.id,
						...data,
					});
				});
				resolve(myArray);
			}
			if (snapshot.empty) {
				resolve([]);
			}
		});
	},
};
