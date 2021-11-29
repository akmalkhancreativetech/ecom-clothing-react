import firebase from "firebase/compat";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD4b8LLnPA3gWaI8dSXJJLsKU3EPwSo_ts",
    authDomain: "ecom-clothing-dce88.firebaseapp.com",
    projectId: "ecom-clothing-dce88",
    storageBucket: "ecom-clothing-dce88.appspot.com",
    messagingSenderId: "633117885908",
    appId: "1:633117885908:web:ac5ae2e3b7b19e7e940241",
    measurementId: "G-52XHZWHJCV"
};
firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid }`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;