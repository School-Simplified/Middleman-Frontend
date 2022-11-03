import { _firebase } from "../firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { SSUser } from "../types";

export async function getUserByEmail(email: string): Promise<SSUser> {
  email;
  const user = await getDoc(doc(_firebase.db, "users", email));
  if (user.exists()) return user.data() as SSUser;
  throw new TypeError(`User with email ${email} does not exist1`);
}

export async function getAllUsers() {
  const users = await getDocs(collection(_firebase.db, "users"));
  return users.docs;
}

export async function createNewUser(
  orgEmail: string,
  firstName: string,
  lastName: string,
  pfp: string
): Promise<SSUser> {
  await setDoc(doc(_firebase.db, "users", orgEmail), {
    orgEmail,
    firstName,
    lastName,
    pfp,
    personalEmail: "",
    role: null,
    supervisor: null,
    created: new Date().getTime(),
    team: null,
    department: null,
    completed: false,
  });
  return (await getUserByEmail(orgEmail)) as SSUser;
}

export async function updateUser(id: string, data: SSUser) {
  await updateDoc(doc(_firebase.db, "users", id), data);
  return await (await getDoc(doc(_firebase.db, "users", id))).data();
}
