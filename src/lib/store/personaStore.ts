import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import type { IPersona } from '../../Interfaces';

export const personaHandlers = {
	createPersona: async (userId: string, persona: IPersona): Promise<string> => {
		// Add persona to sub-collection
		const userRef = doc(db, 'user', userId);
		const personasCollectionRef = collection(userRef, 'personas');
		const newPersonaRef = await addDoc(personasCollectionRef, persona);

		// Update active persona in user
		updateDoc(userRef, {
			'active_persona.id': newPersonaRef.id,
			'active_persona.name': persona.name,
			'active_persona.type': persona.type,
			'active_persona.campaignId': persona.campaignId,
		});
		return newPersonaRef.id;
	},
	getAllPersonasForUser: async (userId: string) => {
		const personaCollectionRef = collection(db, `user/${userId}/personas`);
		const personaQuery = query(personaCollectionRef);
		const snapshot = await getDocs(personaQuery);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as IPersona) }));
	},
	getAllPersonasOfUserInActiveCampaign: async (userId: string, active_campaign: string) => {
		const personaCollectionRef = collection(db, `user/${userId}/personas`);
		const personaQuery = query(personaCollectionRef, where('campaignId', '==', active_campaign));
		const snapshot = await getDocs(personaQuery);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as IPersona) }));
	},
	switchActivePersona: async (userId: string, personaId: string) => {
		const userDocRef = doc(db, `user/${userId}`);
		const personaDocRef = doc(db, `user/${userId}/personas/${personaId}`);
		const personaDocSnapshot = await getDoc(personaDocRef);

		if (!personaDocSnapshot.exists()) return;
		const personaData = personaDocSnapshot.data() as IPersona;

		updateDoc(userDocRef, {
			'active_persona.id': personaDocSnapshot.id,
			'active_persona.name': personaData.name,
			'active_persona.type': personaData.type,
			'active_persona.campaignId': personaData.campaignId,
		});
	},
};
