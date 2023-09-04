import { db } from '$lib/firebase/firebase.client';
import { doc, collection, getDocs, addDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import type { IPersona, ISession } from '../../Interfaces';

export const sessionHandlers = {
	joinSession: async (sessionId: string, persona: IPersona) => {
		const sessionDocRef = doc(db, `campaign/${persona.campaignId}/sessions/${sessionId}`);
		updateDoc(sessionDocRef, { personas: arrayUnion(persona.id) });
	},
	createSessionForCampaign: async (campaignId: string, session: ISession) => {
		const campaignRef = doc(db, 'campaign', campaignId);
		const subCollectionRef = collection(campaignRef, 'sessions');
		await addDoc(subCollectionRef, session);
	},
	getSessionsByCampaign: async (campaignId: string): Promise<ISession[]> => {
		const campaignRef = doc(db, 'campaign', campaignId);
		const sessionsCollectionRef = collection(campaignRef, 'sessions');
		const snapshot = await getDocs(sessionsCollectionRef);
		return snapshot.docs.map((session) => ({ ...(session.data() as ISession), id: session.id }));
	},
};
