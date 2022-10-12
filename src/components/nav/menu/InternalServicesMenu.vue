<template>
  <NavMenu title="Internal Services">
    <NavMenuListItemLink to=""> Schedule an Appointment </NavMenuListItemLink>
    <NavMenuListItemLink to=""> Tech Support </NavMenuListItemLink>
    <NavMenuListItemLink to="">
      Withdraw Service Hours & Hours
    </NavMenuListItemLink>
    <NavMenuListItemLink to=""> Make a Suggestion </NavMenuListItemLink>
    <NavMenuListItemLink to="/services/break">
      Request a Break
    </NavMenuListItemLink>
    <NavMenuListItemLink to=""> File a Complaint </NavMenuListItemLink>
    <NavMenuListItemLink to=""> Request Registration </NavMenuListItemLink>
  </NavMenu>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import NavMenu from "./NavMenu.vue";
import NavMenuListItemLink from "./NavMenuListItemLink.vue";
</script>
