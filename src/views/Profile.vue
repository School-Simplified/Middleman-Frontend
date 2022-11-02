<template>
  <div class="h-full w-screen flex justify-center items-center">
    <div class="w-10/12 h-full">
      <span class="mt-8 block text-3xl w-full pb-4 border-b-2 border-brand">{{
        welcomeText
      }}</span>
      <form
        @submit.prevent
        class="border-2 border-black divide-y-2 divide-solid"
      >
        <div>
          <span class="text-xl">About me</span>
          <div>
            <label>First Name</label>
            <input type="text" />
            <label>Last Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Email</label>
            <input />
          </div>
        </div>
        <div>
          <span class="text-xl">Additional info</span>
          <div>
            <label>Supervisor</label>
            <input type="text" />
          </div>
          <div>
            <label>Department</label>
            <input />
          </div>
          <div>
            <label>Team</label>
            <input type />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { profileCompleted } from "@/lib";
import { ref } from "vue";
const needToSetup = ref(!profileCompleted());
const welcomeText = ref(
  needToSetup ? "Welcome! Please complete your profile." : "Edit profile"
);
</script>
