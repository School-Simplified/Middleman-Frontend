<template>
  <li
    class="px-4 border-b-[6px] h-full flex flex-col justify-center border-b-grey"
    :class="{
      'border-b-selected': props.active,
    }"
  >
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
const props = defineProps<{
  active?: boolean;
}>();
</script>
