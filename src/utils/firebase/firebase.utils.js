import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyB2Y3_R0bdU8_EUz6moKS9I6wG_ky2vq_w',
    authDomain: 'crwn-clothing-851e9.firebaseapp.com',
    projectId: 'crwn-clothing-851e9',
    storageBucket: 'crwn-clothing-851e9.appspot.com',
    messagingSenderId: '1080814407575',
    appId: '1:1080814407575:web:1012b37f23daa10fa97ed2',
    measurementId: 'G-M1DK6BDP0S',
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalProperties
) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userData = await getDoc(userDocRef);
    if (!userData.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalProperties,
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
