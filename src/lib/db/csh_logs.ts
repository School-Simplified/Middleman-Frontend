import { _firebase } from "../firebase";
import {
  getDoc,
  query,
  where,
  doc,
  collection,
  setDoc,
  getDocs,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import type { SSUser, CSHLog } from "../types";
import { getOrgEmail, getSupervisorEmail } from "../auth";

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
export async function createCsLog(
  reason: string,
  hours: number,
  from: Date,
  to: Date
): Promise<any> {
  const fromDate = new Timestamp(Math.floor(from.getTime() / 1000), 0);
  const toDate = new Timestamp(Math.floor(to.getTime() / 1000), 0);
  const log = await addDoc(collection(_firebase.db, "cs_hour_logs"), {});
  const newLog = await setDoc(log, {
    id: log.id,
    checkedOut: false,
    requester: getOrgEmail(),
    supervisor: getSupervisorEmail(),
    reason,
    hours,
    from: fromDate,
    to: toDate,
  });
  return (await getDoc(log)).data();
}

export async function getLogsToVerify(): Promise<Array<CSHLog>> {
  const q = query(
    collection(_firebase.db, "cs_hour_logs"),
    where("supervisor", "==", getOrgEmail())
  );
  const ret: CSHLog[] = [];
  (await getDocs(q)).forEach((l) => {
    ret.push(l.data() as CSHLog);
  });
  return ret;
}
