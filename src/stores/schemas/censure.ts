import type { Supervisor } from "./supervisor";
import type { StaffFile } from "./stafffile";
export type Censure = {
  id: string;
  details: string;
  dateGiven: Date;
  censuredBy?: Supervisor;
  evidence: string;
  createdAt: Date;
  updatedAt?: Date;
  user: StaffFile;
};
