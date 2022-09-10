<template>
  <Popover class="relative ring-transparent ring-black">
    <PopoverButton
      ><span class="flex flex-row"
        >{{ props.title }}
        <ChevronDownIcon class="ml-1 h-6 w-6 text-white font-bold" /></span
    ></PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 mt-8">
        <div class="shadow-2xl rounded-md text-grey">
          <ul class="list-none w-72">
            <slot></slot>
          </ul>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
const props = defineProps<{
  title: string;
}>();
</script>
