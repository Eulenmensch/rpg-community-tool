import type { ICampaign, IPersona, IPlayable, ISession } from '$lib/Interfaces';
import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	or,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { type Writable, writable } from 'svelte/store';
import { theUnknownPlayables, unePlayables } from '../../utils';
import { authHandlers } from './authStore';

export const campaignStore: Writable<{
	campaigns: ICampaign[];
	selectedCampaign: string | null;
	campaign: ICampaign | null;
}> = writable({
	campaigns: [],
	selectedCampaign: null,
	campaign: null,
});

export const campaignHandlers = {
	getCampaign: async (campaignId: string): Promise<ICampaign> => {
		const campaignDocRef = doc(db, `campaign/${campaignId}`);
		const docSnapshot = await getDoc(campaignDocRef);
		const campaignData = docSnapshot.data() as ICampaign;

		// Fetch personas subcollection
		const personasCollectionRef = collection(db, `campaign/${campaignId}/personas`);
		const personasSnapshot = await getDocs(personasCollectionRef);
		const personas = personasSnapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as IPersona),
		);

		// Fetch sessions subcollection
		const sessionsCollectionRef = collection(db, `campaign/${campaignId}/sessions`);
		const sessionsSnapshot = await getDocs(sessionsCollectionRef);
		const sessions = sessionsSnapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as ISession),
		);

		return {
			...campaignData,
			id: campaignId,
			personas: personas,
			sessions: sessions,
		};
	},
	addPersonaToCampaign: async (campaignId: string, persona: IPersona) => {
		const personaRef = doc(db, `campaign/${campaignId}/personas/${persona.id}`);
		await setDoc(personaRef, persona);
	},
	removePersonaFromCampaign: async (campaignId: string, personaId: string) => {
		const personaRef = doc(db, `campaign/${campaignId}/personas/${personaId}`);
		await deleteDoc(personaRef);
	},
	getAllPersonasInCampaign: async (campaignId: string): Promise<IPersona[]> => {
		const personasCollectionRef = collection(db, `campaign/${campaignId}/personas`);
		const snapshot = await getDocs(personasCollectionRef);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IPersona));
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
