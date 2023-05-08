import { db } from '$lib/firebase/firebase.client';
import { addDoc, collection } from 'firebase/firestore';

export const campaignHandlers = {
	createCampaign: async (userId: string, name: string) => {
		await addDoc(collection(db, `campaign`), {
			user_id: userId,
			name: name,
		});
	},
};
