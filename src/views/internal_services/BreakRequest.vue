<template>
  <div class="border-2 border-grey p-8 rounded-md w-1/2">
    <form @submit.prevent="sendBreakRequest">
      <div class="flex flex-row justify-between"></div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { createBreakRequestTicket } from "@/lib/tickets";
const start = ref();
const end = ref();
const reason = ref<string>("");
const sendBreakRequest = async () => {
  console.log(start.value, end.value);
  if (!start.value || !end.value) return;
  const result = await createBreakRequestTicket(start.value, end.value);
  if (1) {
    // do error stuff
  } else {
    // do non error stuff
  }
};
</script>
