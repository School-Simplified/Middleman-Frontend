<script setup lang="ts">
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { getUserByEmail, getFirstName } from "@/lib";
import { getAllUsers } from "@/lib";
import { updateDoc } from "firebase/firestore";
const name = ref(getFirstName());
</script>

<template>
  <main>
    <div class="flex items-center justify-center pt-16">
      <div class="h-20 w-5/6 bg-brand rounded drop-shadow-lg">
        <div
          class="font-bold text-3xl text-white py-5 px-10 m-auto flex justify-between"
        >
          <h1>Welcome, {{ name }}!</h1>
          <Cog6ToothIcon class="h-8 w-8 mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  </main>
</template>
