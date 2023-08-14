import { db } from '$lib/firebase/firebase.client';
import { doc, collection, getDocs, addDoc } from 'firebase/firestore';
import type { ISession } from '../../Interfaces';

export const sessionHandlers = {
	createSessionForCampaign: async (campaignId: string, session: ISession) => {
		const campaignRef = doc(db, 'campaign', campaignId);
		const subCollectionRef = collection(campaignRef, 'sessions');
		const subDocRef = await addDoc(subCollectionRef, session);
	},
	getSessionsByCampaign: async (campaignId: string): Promise<ISession[]> => {
		const campaignRef = doc(db, 'campaign', campaignId);
		const sessionsCollectionRef = collection(campaignRef, 'sessions');
		const snapshot = await getDocs(sessionsCollectionRef);
		return snapshot.docs.map((session) => ({ id: session.id, ...(session.data() as ISession) }));
	},
};
