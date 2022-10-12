<template>
  <RouterLink :to="props.to">
    <NavMenuListItem>
      <slot></slot>
    </NavMenuListItem>
  </RouterLink>
</template>

<script lang="ts" setup>
import NavMenuListItem from "./NavMenuListItem.vue";
const props = defineProps<{
  to: string;
}>();
</script>
