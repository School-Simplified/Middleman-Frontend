// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuWQMnbQO8jyzi0P9Pc5sUQL_zNFSf5Z8",
  authDomain: "ss-stuff-b4281.firebaseapp.com",
  projectId: "ss-stuff-b4281",
  storageBucket: "ss-stuff-b4281.appspot.com",
  messagingSenderId: "39894379601",
  appId: "1:39894379601:web:92cee6f290d898e0721c70",
  measurementId: "G-B27L4SL5V1",
};
const _firebase: any = {};
let user: any = {};
// Initialize Firebase
export async function initializeFirebase() {
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuthProvider = new GoogleAuthProvider();
  const firebaseAuth = getAuth();
  const resp = await signInWithPopup(firebaseAuth, firebaseAuthProvider);
  const credential = GoogleAuthProvider.credentialFromResult(resp);
  const token = credential?.accessToken;
  const firebaseDb = getFirestore(firebaseApp);

  _firebase.app = firebaseApp;
  _firebase.auth = firebaseAuth;
  _firebase.db = firebaseDb;
  user = { ...resp.user };
}

export function getUsername() {
  return user.displayName ?? null;
}
