import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User,
	type UserCredential,
} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/firebase.client';
import { collection, doc, getDoc, getDocs, or, query, setDoc, where } from 'firebase/firestore';

interface IAuthData {
	user: User | null;
	loading: boolean;
	data: any; //TODO: Add type once we have data
}

export const authStore: Writable<IAuthData> = writable({
	user: null,
	loading: true,
	data: {},
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
				},
				{ merge: true },
			);
			return res;

			//TODO: Set Store aswell
		}
	},
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
};
