import type { User } from "firebase/auth";
import {
  createNewUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
} from "./db/users";
import { ref } from "vue";
import type { SSUser } from "@/lib/types";

export const authUser = ref<SSUser>();

export const setUser = async (
  user: User
): Promise<{ created: boolean; user: SSUser }> => {
  try {
    const existingUser = await getUserByEmail(user.email as string);
    authUser.value = existingUser;
    return { created: false, user: existingUser };
  } catch (err) {
    // create user and prompt to complete login info
    const newUser = await createNewUser(
      user.email as string,
      (user.displayName as string).split(" ")[0],
      (user.displayName as string).split(" ")[1],
      user.photoURL as string
    );
    authUser.value = newUser;
    return { created: true, user: newUser };
  }
};
export async function editUser(id: string, user: SSUser) {
  const newUser = await updateUser(id, user);
  authUser.value = newUser as SSUser;
}
export const logOut = () => {};
export function getFirstName() {
  return authUser?.value?.firstName || "null";
}

export function getLastName() {
  return authUser?.value?.lastName || "null";
}

export function getImageUrl() {
  return authUser?.value?.pfp || "null";
}

export function getOrgEmail() {
  return authUser.value?.orgEmail || "null";
}

export function getPersonalEmail() {
  return authUser.value?.personalEmail;
}

export function getRole() {
  return authUser.value?.role;
}

export function getSupervisorEmail() {
  return authUser.value?.supervisor;
}

export function getUserDepartment() {
  return authUser.value?.department;
}

export function getUserTeam() {
  return authUser.value?.team;
}
