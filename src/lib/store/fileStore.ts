import { storage } from '$lib/firebase/firebase.client';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { writable } from 'svelte/store';

export const uploadProgress = writable(0);

export const fileHandlers = {
	uploadFile: async (file: File, path: string): Promise<string> => {
		const storageRef = ref(storage, path);
		try {
			const snapshot = await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);
			uploadProgress.set(100);
			return downloadURL;
		} catch (error) {
			console.error('Error uploading file:', error);
			throw error;
		}
	},

	deleteFile: async (path: string): Promise<void> => {
		const storageRef = ref(storage, path);
		try {
			await deleteObject(storageRef);
		} catch (error) {
			console.error('Error deleting file:', error);
			throw error;
		}
	},
};
