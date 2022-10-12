<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/nav/Navbar.vue";
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col">
    <div>
      <Navbar />
    </div>
    <div class="grow">
      <RouterView />
    </div>
  </div>
</template>
