import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import type { IPersona } from '../../Interfaces';
import { campaignHandlers } from './campaignStore';

export const personaHandlers = {
	createPersona: async (userId: string, persona: IPersona): Promise<string> => {
		// Add persona to users sub-collection
		const userRef = doc(db, 'user', userId);
		const personasCollectionRef = collection(userRef, 'personas');
		const newPersonaRef = await addDoc(personasCollectionRef, persona);
		const newPersonaId = newPersonaRef.id;

		// Add persona to campaign's personas subcollection
		await campaignHandlers.addPersonaToCampaign(persona.campaignId, {
			...persona,
			id: newPersonaId,
		});

		// Update active persona in user
		updateDoc(userRef, {
			'active_persona.id': newPersonaRef.id,
			'active_persona.name': persona.name,
			'active_persona.type': persona.type,
			'active_persona.campaignId': persona.campaignId,
			'active_persona.about': persona.about,
			'active_persona.userId': persona.userId,
		});

		return newPersonaRef.id;
	},
	updatePersona: async (
		userId: string,
		personaId: string,
		updatedPersona: Partial<IPersona>,
	): Promise<void> => {
		// Update persona in user's personas subcollection
		const userPersonaRef = doc(db, `user/${userId}/personas/${personaId}`);
		await updateDoc(userPersonaRef, updatedPersona);

		// Update persona in campaign's personas subcollection
		if (updatedPersona.campaignId) {
			const campaignPersonaRef = doc(
				db,
				`campaign/${updatedPersona.campaignId}/personas/${personaId}`,
			);
			await updateDoc(campaignPersonaRef, updatedPersona);
		}

		// Update active persona in user if it's the currently active one
		const userRef = doc(db, `user/${userId}`);
		const userDoc = await getDoc(userRef);
		const userData = userDoc.data();

		if (userData && userData.active_persona && userData.active_persona.id === personaId) {
			await updateDoc(userRef, {
				'active_persona.name': updatedPersona.name || userData.active_persona.name,
				'active_persona.type': updatedPersona.type || userData.active_persona.type,
				'active_persona.campaignId':
					updatedPersona.campaignId || userData.active_persona.campaignId,
				'active_persona.about': updatedPersona.about || userData.active_persona.about,
			});
		}
	},
	getPersonaById: async (campaignId: string, personaId: string): Promise<IPersona | null> => {
		const personaDocRef = doc(db, `campaign/${campaignId}/personas/${personaId}`);
		const personaDocSnapshot = await getDoc(personaDocRef);

		if (personaDocSnapshot.exists()) {
			return { id: personaDocSnapshot.id, ...(personaDocSnapshot.data() as IPersona) };
		} else {
			console.log(`No persona found with ID: ${personaId}`);
			return null;
		}
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
			'active_persona.id': personaDocSnapshot?.id,
			'active_persona.name': personaData?.name,
			'active_persona.type': personaData?.type,
			'active_persona.campaignId': personaData?.campaignId,
			active_campaign: personaData?.campaignId,
		});
	},
	deletePersona: async (userId: string, personaId: string, campaignId: string) => {
		// Remove persona from user's personas subcollection
		const personaRef = doc(db, `user/${userId}/personas/${personaId}`);
		await deleteDoc(personaRef);

		// Remove persona from campaign's personas subcollection
		await campaignHandlers.removePersonaFromCampaign(campaignId, personaId);
	},
};
