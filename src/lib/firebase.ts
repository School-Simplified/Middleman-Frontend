// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
const router = useRouter();
const firebaseConfig = {
  apiKey: "AIzaSyBuWQMnbQO8jyzi0P9Pc5sUQL_zNFSf5Z8",
  authDomain: "ss-stuff-b4281.firebaseapp.com",
  // authDomain: "localhost:5173",
  projectId: "ss-stuff-b4281",
  storageBucket: "ss-stuff-b4281.appspot.com",
  messagingSenderId: "39894379601",
  appId: "1:39894379601:web:92cee6f290d898e0721c70",
  measurementId: "G-B27L4SL5V1",
};
export const _firebase: any = {};

// Initialize Firebase
export async function initializeFirebase() {
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);
  const authProvider = new GoogleAuthProvider();
  const firestore = getFirestore(firebaseApp);
  _firebase.app = firebaseApp;
  _firebase.auth = firebaseAuth;
  _firebase.provider = authProvider;
  _firebase.db = firestore;
}
async function authenticate(_user: any) {
  _firebase.auth.updateCurrentUser(_user);
}

export function getUsername() {
  return _firebase.auth.currentUser?.displayName || "null";
}

export function getImageUrl() {
  return _firebase.auth.currentUser?.photoURL || "null";
}

export function isAuthed() {
  return !!_firebase.auth.currentUser;
}
