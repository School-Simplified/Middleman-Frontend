<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import Navbar from "./components/nav/Navbar.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-col flex-1">
    <div>
      <Navbar />
    </div>
    <div class="h-full max-h-full min-h-0">
      <RouterView />
    </div>
  </div>
</template>
