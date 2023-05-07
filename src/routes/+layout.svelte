<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { auth, db } from '$lib/firebase/firebase.client';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/store/authStore';
	import { doc, getDoc } from 'firebase/firestore';

	const nonAuthRoutes = ["/account/login", "account/register"]

	onMount(() => {
		auth.onAuthStateChanged(async (user) => {
			const currPath = window.location.pathname;

			// Redirect all private pages to login
			if (!user && !nonAuthRoutes.includes(currPath)) {
			
				goto("/account/login")
				return;
			}

			// Redirect logged in users to dashboard when visiting login
			if (user && currPath === "/account/login") {
				goto("/")
        		return;
	      	}

			if (!user) {
        		return;
      		}

			// The user is fetched from firestore on every page reload
			// We should later use local storage / jwt to reduce db runs but this works for now
			const docRef = doc(db, "user", user.uid);
        	const userFromDb = await getDoc(docRef);
       		if(userFromDb.exists()){
            const userData = userFromDb.data()

            authStore.update(curr => ({
				...curr,
				loading: false,
				data: userData,
            }))
        }
		})
    })
</script>

<slot />
