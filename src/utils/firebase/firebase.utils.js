// Import the functions you need from the SDKs you need
import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from 'firebase/auth';

import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyDyD-d6168fCqpxYr8U88pjatQOylJyV2c',
   authDomain: 'crwn-clothing-db-ba2bb.firebaseapp.com',
   projectId: 'crwn-clothing-db-ba2bb',
   storageBucket: 'crwn-clothing-db-ba2bb.appspot.com',
   messagingSenderId: '792032196614',
   appId: '1:792032196614:web:97f1ab84d579be0a612b87',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Google Auth: need the google intance
const provider = new GoogleAuthProvider();

//Configuration obj: We can tell different ways that we want this provider to behave
provider.setCustomParameters({
   prompt: 'select_account',
});

//Create the authentication instance
export const auth = getAuth();

//Sign in options
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, provider);

//Create the DB, so that, we can perform CRUD operations
export const db = getFirestore();

export const addCollectionAndDocuments = async (
   collectionKey,
   objectsToAdd
) => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);
   /// CRUD for the dataBase
   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
   });

   await batch.commit();
   console.log('done');
};

//Method that perfoms a GET action
export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapshot = await getDocs(q);
   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
   }, {});

   return categoryMap;
}

//Method that take the data that we are getting from the auth service (sigInWithGooglePopup succeeded) and store that inside firestore (our data base)
export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation
) => {
   if (!userAuth) return;
   //Check if there's an existing document reference, takes the DB - DB specified collection 'users' - collection Identifier (the id of the user that is authenticated)
   const userDocRef = doc(db, 'users', userAuth.uid);
   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         });
      } catch (error) {
         console.log('Error creating the user', error);
      }
   }

   return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithhEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback);
