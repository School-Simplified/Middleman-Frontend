import type { User } from "firebase/auth";
import { createNewUser, getAllUsers, getUserByEmail } from "./db/users";
import { ref } from "vue";
import type { SSUser } from "@/lib/types";

export const authUser = ref<SSUser | {}>({});

export const setUser = async (
  user: User
): Promise<{ created: boolean; user: SSUser }> => {
  const existingUser = await getUserByEmail(user.email);
  if (!existingUser) {
    // create user and prompt to complete login info
    const newUser = await createNewUser(
      user.email,
      user.displayName.split(" ")[0],
      user.displayName.split(" ")[1],
      user.photoURL
    );
    authUser.value = newUser;
    return { created: true, user: newUser };
  } else {
    authUser.value = existingUser;
    return { created: false, user: existingUser };
  }
};

export const logOut = () => {};
