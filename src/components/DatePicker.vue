<!-- NOTE: Watch issue for updates so we can safely switch over to ts with no issues: https://github.com/elreco/vue-tailwind-datepicker/issues/15 -->

<script setup lang="js">
import { ref } from "vue";
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const dateValue = ref({
  startDate: "",
  endDate: ""
})

const formatter = ref({
  date: 'MM/DD/YYYY',
  month: 'MMMM'
})
</script>

<template>
  <div class="relative">
    <vue-tailwind-datepicker as-single use-range :formatter="formatter" v-model="dateValue" />
  </div>
</template>