// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API_KEY,
    authDomain:  process.env.NEXT_PUBLIC_FIRESTORE_AUTH_DOMAIN,
    projectId:  process.env.NEXT_PUBLIC_FIRESTORE_PROJECT_ID,
    storageBucket:  process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_MESSAGING_SENDER_ID,
    appId:  process.env.NEXT_PUBLIC_FIRESTORE_APP_ID,
    measurementId:  process.env.NEXT_PUBLIC_FIRESTORE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore()
export const auth = getAuth();


