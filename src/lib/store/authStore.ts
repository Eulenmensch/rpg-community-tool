import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
import { auth } from '$lib/firebase/firebase.client';

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
	register: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
};
