// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyD-d6168fCqpxYr8U88pjatQOylJyV2c",
    authDomain: "crwn-clothing-db-ba2bb.firebaseapp.com",
    projectId: "crwn-clothing-db-ba2bb",
    storageBucket: "crwn-clothing-db-ba2bb.appspot.com",
    messagingSenderId: "792032196614",
    appId: "1:792032196614:web:97f1ab84d579be0a612b87"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Google Auth: need the google intance
const provider = new GoogleAuthProvider();

//Configuration obj: We can tell different ways that we want this provider to behave
provider.setCustomParameters({
    prompt: 'select_account'
})

//Create the authentication instance
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Create the DB, so that, we can perform CRUD operations
export const db = getFirestore();

//Method that take the data that we are getting from the auth service (sigInWithGooglePopup succeeded) and store that inside firestore (our data base)
export const createUserDocumentFromAuth = async (userAuth) => {

    //Check if there's an existing document reference, takes the DB - DB specified collection 'users' - collection Identifier (the id of the user that is authenticated)
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch(error){
            console.log('Error creating the user', error)
        }
    }

    return userDocRef;
}