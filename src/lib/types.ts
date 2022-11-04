export type SSUser = {
  orgEmail: string;
  personalEmail: string;
  firstName: string;
  lastName: string;
  supervisor: string | undefined; // ref to document like /users/josef.macera@ss // NOTE doing this to shut Firebase up
  created: number; // ms since timestamp
  team: string | undefined; // doing this to shut Firebase up
  department: string | undefined; // doing this to shut Firebase up
  pfp: string;
  completed: boolean;
  role:
    | "Associate"
    | "Manager"
    | "Director"
    | "Vice President"
    | "President"
    | "Executive Director"
    | "Corporate Officer" // setting of COs and EDs is manual
    | undefined; // doing this to shut Firebase up
};

export type CSHLog = {
  approved: boolean;
  approvedBy: string;
  checkedOut: boolean;
  from: number;
  to: number;
  hours: number;
  reason: number;
  requester: number;
};
