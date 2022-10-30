import { _firebase } from "../firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export async function getUserByEmail(email: string) {
  const user = await getDoc(doc(_firebase.db, "users", email));
  return user.exists() ? user.data() : null;
}

export async function getAllUsers() {
  const users = await getDocs(collection(_firebase.db, "users"));
  return users.docs;
}
