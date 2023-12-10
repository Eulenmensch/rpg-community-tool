import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User,
	type UserCredential,
} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/firebase.client';
import { collection, doc, getDocs, or, query, setDoc, where } from 'firebase/firestore';
import type { IUserData } from '../../Interfaces';

interface IAuthData {
	user: User | null;
	loading: boolean;
	isLoggedIn: boolean;
	data: IUserData;
}

export const authStore: Writable<IAuthData> = writable({
	user: null,
	loading: true,
	isLoggedIn: false,
	data: {
		uid: '',
		active_campaign: '',
		email: '',
		username: '',
		active_persona: null,
		personas: [],
	},
});

export const authHandlers = {
	doesUserExist: async (email: string, username: string) => {
		const userRef = collection(db, 'user');
		const q = query(userRef, or(where('username', '==', username), where('email', '==', email)));
		const snapshot = await getDocs(q);

		if (snapshot.empty) {
			return false;
		}
		return true;
	},
	register: async (email: string, password: string, username: string) => {
		const res: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
		if (res.user) {
			const docRef = doc(db, `user/${res.user.uid}`);
			setDoc(
				docRef,
				{
					uid: res.user.uid,
					username: username,
					email: email,
					active_campaign: null,
				},
				{ merge: true },
			);
			return res;
		}
	},
	login: async (email: string, password: string) => {
		try {
			return await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error);
		}
	},
	logout: async () => {
		await signOut(auth);
	},
	update: async (userId: string, campaignId: string, reset_persona?: boolean) => {
		//TODO: Make this a more general version once we update other parameters as well
		const docRef = doc(db, `user/${userId}`);

		console.log('CAMPAIGN', campaignId);
		console.log('USER', userId);
		console.log('REST', reset_persona);

		if (reset_persona) {
			setDoc(
				docRef,
				{
					active_campaign: campaignId,
					active_persona: null,
				},
				{ merge: true },
			);
		}
		setDoc(
			docRef,
			{
				active_campaign: campaignId,
			},
			{ merge: true },
		);
	},
};
