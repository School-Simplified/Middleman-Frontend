import { _firebase } from "../firebase";
import {
  getDoc,
  query,
  where,
  doc,
  collection,
  setDoc,
  getDocs,
} from "firebase/firestore";
import type { SSUser, CSHLog } from "../types";

export async function getCsLogsFromUser(email: string): Promise<Array<CSHLog>> {
  const q = query(
    collection(_firebase.db, "cs_hour_logs"),
    where("requester", "==", email)
  );
  const ret: CSHLog[] = [];
  (await getDocs(q)).forEach((l) => {
    ret.push(l.data() as CSHLog);
  });
  return ret;
}
