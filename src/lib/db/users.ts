import { _firebase } from "../firebase";
import { getDoc, doc, getDocs, collection, setDoc } from "firebase/firestore";
import type { SSUser } from "../types";

export async function getUserByEmail(email: string): Promise<SSUser | null> {
  email;
  const user = await getDoc(doc(_firebase.db, "users", email));

  return user.exists() ? (user.data() as SSUser) : null;
}

export async function getAllUsers() {
  const users = await getDocs(collection(_firebase.db, "users"));
  return users.docs;
}

export async function createNewUser(
  email: string,
  firstName: string,
  lastName: string,
  pfp: string
): Promise<SSUser> {
  await setDoc(doc(_firebase.db, "users", email), {
    email,
    firstName,
    lastName,
    pfp,
    supervisor: null,
    created: new Date().getTime(),
    team: null,
    department: null,
    completed: false,
  });
  return await getUserByEmail(email);
}
