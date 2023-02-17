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
  updateDoc,
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

export async function verifyLog(logId: string): Promise<CSHLog> {
  await updateDoc(doc(_firebase.db, "cs_hour_logs", logId), {
    approved: true,
    approvedBy: getOrgEmail(),
  });
  return (await (
    await getDoc(doc(_firebase.db, "cs_hour_logs", logId))
  ).data()) as CSHLog;
}
export async function rejectLog(logId: string): Promise<CSHLog> {
  await updateDoc(doc(_firebase.db, "cs_hour_logs", logId), {
    approved: false,
    approvedBy: getOrgEmail(),
  });
  return (await (
    await getDoc(doc(_firebase.db, "cs_hour_logs", logId))
  ).data()) as CSHLog;
}

export async function checkoutCsLog(logs: CSHLog[]) {
  const totalHours: number = logs.reduce((a, o) => a + o.hours, 0);
  console.log(totalHours);
  await addDoc(collection(_firebase.db, "cs_hour_checkouts"), {
    hours: totalHours,
    logs: logs.map((log) => `/cs_hour_logs/${log.id}`),
    user: getOrgEmail(),
  });
}
