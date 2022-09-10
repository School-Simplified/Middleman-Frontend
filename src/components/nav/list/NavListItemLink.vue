<template>
  <NavListItem :active="isActive">
    <RouterLink :to="to"> <slot> </slot></RouterLink>
  </NavListItem>
</template>
<script setup lang="ts">
import NavListItem from "./NavListItem.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const props = defineProps<{
  to: string;
}>();
const isActive = computed(() => router.currentRoute.value.path === props.to);
</script>
