export type SSUser = {
  orgEmail: string;
  personalEmail: string;
  firstName: string;
  lastName: string;
  supervisor: string; // ref to document like /users/josef.macera@ss
  created: number; // ms since timestamp
  team: string;
  department: string;
  pfp: string;
  completed: boolean;
  role:
    | "Associate"
    | "Manager"
    | "Director"
    | "Vice President"
    | "President"
    | "Executive Director"
    | "Corporate Officer"; // setting of COs and EDs is manual
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
