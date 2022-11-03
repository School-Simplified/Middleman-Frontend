<template>
  <div class="h-full w-screen flex justify-center items-center">
    <div class="w-10/12 h-full max-h-full min-h-0 flex flex-col flex-grow-0">
      <span class="mt-8 block text-3xl w-full pb-4 border-b-2 border-brand">{{
        $route.name
      }}</span>
      <router-view></router-view>
    </div>
  </div>
</template>
