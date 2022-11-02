<template>
  <div
    class="h-screen w-screen fixed top-0 z-10 bg-brand grid place-content-center"
  >
    <button
      class="px-12 py-8 rounded text-brand text-xl border-2 bg-white border-white"
      @click="login"
    >
      Login :)
    </button>
  </div>
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
    router.push("/");
  }
});
const logout = async () => {
  await signOut(auth);
};
</script>
