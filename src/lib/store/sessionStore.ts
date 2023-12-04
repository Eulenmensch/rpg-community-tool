import { db } from '$lib/firebase/firebase.client';
import { doc, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import type { IPersona, ISession } from '../../Interfaces';
import { writable, type Writable } from 'svelte/store';

export const sessionStore: Writable<ISession[]> = writable([]);

export const sessionHandlers = {
	joinSession: async (sessionId: string, persona: IPersona) => {
		const personasInSessionRef = collection(
			db,
			`campaign/${persona.campaignId}/sessions/${sessionId}/personas`,
		);

		delete persona.id;
		await addDoc(personasInSessionRef, persona);
	},
	unsubscribeFromSession: async (sessionId: string, persona: IPersona) => {
		const personasInSessionRef = collection(
			db,
			`campaign/${persona.campaignId}/sessions/${sessionId}/personas`,
		);
		const personaDocRef = doc(personasInSessionRef, persona.id);
		await deleteDoc(personaDocRef);
	},
	createSessionForCampaign: async (campaignId: string, session: ISession): Promise<string> => {
		console.log('SES', session);
		const campaignRef = doc(db, 'campaign', campaignId);
		const subCollectionRef = collection(campaignRef, 'sessions');
		const newSessionDoc = await addDoc(subCollectionRef, session);
		return newSessionDoc.id;
	},
	editSession: async (campaignId: string, session: ISession) => {
		const docRef = doc(db, `campaign/${campaignId}/sessions/${session.id}`);
		await updateDoc(docRef, {
			name: session.name,
			date: session.date,
			description: session.description,
			slots: session.slots,
			status: session.status,
		});
	},
	deleteSession: async (campaignId: string, sessionId: string) => {
		//TODO: Security check
		const docRef = doc(db, `campaign/${campaignId}/sessions/${sessionId}`);
		await deleteDoc(docRef);
	},
	getSessionsByCampaign: async (campaignId: string): Promise<ISession[]> => {
		const campaignRef = doc(db, 'campaign', campaignId);
		const sessionsCollectionRef = collection(campaignRef, 'sessions');
		const snapshot = await getDocs(sessionsCollectionRef);

		const sessions: ISession[] = [];
		for (const sessionDoc of snapshot.docs) {
			const sessionData = sessionDoc.data() as ISession;
			const sessionId = sessionDoc.id;

			const personasCollectionRef = collection(sessionDoc.ref, 'personas');
			const personasSnapshot = await getDocs(personasCollectionRef);
			const personas = personasSnapshot.docs.map((personaDoc) => ({
				...(personaDoc.data() as IPersona),
				id: personaDoc.id,
			}));

			sessionData.personas = personas;
			sessions.push({ ...sessionData, id: sessionId });
		}

		return sessions;
	},
};
