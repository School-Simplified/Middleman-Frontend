export type SSUser = {
  email: string;
  firstName: string;
  lastName: string;
  supervisor: string | null; // ref to document like /users/josef.macera@ss
  created: number; // ms since timestamp
  team: string | null;
  department: string | null;
  pfp: string;
  completed: boolean;
};
