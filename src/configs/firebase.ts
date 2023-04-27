// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRtJcDRaUXP1m8opIrdwv1MExzklDEKEY",
  authDomain: "vocabularies-4fa6a.firebaseapp.com",
  projectId: "vocabularies-4fa6a",
  storageBucket: "vocabularies-4fa6a.appspot.com",
  messagingSenderId: "306508368999",
  appId: "1:306508368999:web:604659024e65101af358c2"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
