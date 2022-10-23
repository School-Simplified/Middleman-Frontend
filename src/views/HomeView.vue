<script setup lang="ts">
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { getUsername } from "@/lib/firebase";
const name = ref(getUsername());
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
