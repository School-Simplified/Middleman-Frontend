<!-- NOTE: Watch issue for updates so we can safely switch over to ts with no issues: https://github.com/elreco/vue-tailwind-datepicker/issues/17 -->

<script setup lang="ts">
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const dateValue = ref({
  startDate: "",
  endDate: "",
});

const formatter = ref({
  date: "MM/DD/YYYY",
  month: "MMMM",
});
</script>

<template>
  <div class="px-0">
    <vue-tailwind-datepicker
      as-single
      use-range
      required
      :formatter="formatter"
      separator=" to "
      v-model="dateValue"
      input-classes="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
    />
    <p class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
      Enter a date range.
    </p>
  </div>
</template>
