<template>
  <nav class="w-full h-16 bg-grey flex flex-row">
    <NavList>
      <Squares2X2Icon class="h-8 w-8 text-white mx-2" />
      <AcademicCapIcon class="h-8 w-8 text-white ml-2 mr-4" />
    </NavList>

    <div class="h-full flex flex-col justify-center">
      <NavList>
        <NavListItemLink to="/">Dashboard</NavListItemLink>
        <NavListItemLink to="/db">Staff Database</NavListItemLink>
        <NavListItemLink to="/profile">My Profile </NavListItemLink>
        <NavListItem><InternalServicesMenu /></NavListItem>
        <NavListItem><ToolsMenu /></NavListItem>
        <NavListItem><ResourcesMenu /></NavListItem>
      </NavList>
    </div>
    <div class="h-full ml-auto">
      <NavList>
        <EnvelopeIcon class="h-8 w-8 mx-2" />
        <QuestionMarkCircleIcon class="h-8 w-8 mx-2" />
        <Cog6ToothIcon class="h-8 w-8 mx-2" />

        <img
          class="w-10 h-10 rounded-full mx-2 ring-2 ring-gray-300 hover:ring-gray-400"
          src="@/assets/hector.jpg"
          alt="Bordered avatar"
        />
      </NavList>
    </div>
  </nav>
</template>
<script setup lang="ts">
import NavListItem from "./list/NavListItem.vue";
import ToolsMenu from "./menu/ToolsMenu.vue";
import InternalServicesMenu from "./menu/InternalServicesMenu.vue";
import {
  AcademicCapIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import ResourcesMenu from "./menu/ResourcesMenu.vue";
import NavList from "./list/NavList.vue";
import NavListItemLink from "./list/NavListItemLink.vue";
</script>
