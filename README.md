# General information

- Infinite Loading: Since we wipe out all of the test data sometimes your local cache might be out of sync with the existing data online. If you experience infinite loading you need to go to "Application" and delete the cookies and the IndexedDb which is created by firebase.
- Since we do not have separate test dbs yet there might be issues due to a local version that changed the online db

# Developing

```bash
# First install the necessary packages
npm install
# Start the server and open the app in a new browser tab
npm run dev -- --open
```

# Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
