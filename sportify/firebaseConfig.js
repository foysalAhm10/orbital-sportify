// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUVvXjy_x-YikIzFcuULLOs353Gi9pnCY",
  authDomain: "sportify-orbital.firebaseapp.com",
  projectId: "sportify-orbital",
  storageBucket: "sportify-orbital.firebasestorage.app",
  messagingSenderId: "423265146879",
  appId: "1:423265146879:web:8b10a0ab1f7c183449b9ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});//persist the auth state across app restarts
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
