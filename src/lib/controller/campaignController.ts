import { db } from '$lib/firebase/firebase.client';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { ICampaign } from '../../Interfaces';

export const campaignHandlers = {
	createCampaign: async (userId: string, name: string) => {
		await addDoc(collection(db, `campaign`), {
			user_id: userId,
			name: name,
		});
	},
	getAllCampaignsForUser: async (userId: string): Promise<ICampaign[] | null> => {
		const campaignRef = collection(db, 'campaign');
		const q = query(campaignRef, where('user_id', '==', userId));
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
				reject('query returned no results');
			}
		});
	},
};
