<template>
  <button class="p-8 rounded text-white bg-brand" @click="login">Login</button>
  <button class="p-8 rounded text-white bg-brand" @click="logout">
    Logout
  </button>
</template>
<script setup lang="ts">
import { signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { _firebase } from "@/lib/firebase";
import { useRouter } from "vue-router";
const { auth, provider } = _firebase;
const router = useRouter();
const login = async () => {
  await signInWithRedirect(_firebase.auth, provider);
};
const watcher = onAuthStateChanged(_firebase.auth, async (user) => {
  if (user) {
    console.log("Authenticated");

    router.push("/");
  }
});
const logout = async () => {
  await signOut(auth);
};
</script>
