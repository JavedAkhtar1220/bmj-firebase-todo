import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARUWNLV52gaSZYFmOptPyeMH5HlN4WAJE",
    authDomain: "todo-375be.firebaseapp.com",
    projectId: "todo-375be",
    storageBucket: "todo-375be.appspot.com",
    messagingSenderId: "640627873946",
    appId: "1:640627873946:web:f0c14e6bf96b5aaa3ee723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();