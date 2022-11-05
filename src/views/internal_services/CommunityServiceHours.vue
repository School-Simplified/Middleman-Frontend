<template>
  <div class="min-h-0">
    <span class="text-lg">Your CS Hour Logs</span>
    <table
      v-if="data.length > 0"
      class="table-auto block border-2 border-slate-800 rounded-md p-4 w-full h-5/6 overflow-y-scroll"
    >
      <thead class="w-full flex justify-between">
        <th>From</th>
        <th>To</th>
        <th>Reason</th>
        <th>Approved</th>
      </thead>
      <tbody class="w-full flex flex-col">
        <tr
          v-for="csh in data"
          :key="csh.id"
          class="w-full flex justify-items-stretch justify-between border-2 border-hovered my-2 rounded-md p-2"
        >
          <td>{{ new Date(csh.from).toLocaleDateString() }}</td>
          <td>{{ new Date(csh.to).toLocaleDateString() }}</td>
          <td>
            {{ csh.reason }}
          </td>
          <td v-if="csh.approved">Yes :)</td>
          <td v-else>No</td>
        </tr>
      </tbody>
    </table>
    <p v-else>You have no CS hour logs.</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getCsLogsFromUser } from "@/lib";
console.log(await getCsLogsFromUser("anncine.lin@schoolsimplified.org"));
const data = ref([
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 1,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
  {
    id: 2,
    from: 1667452695199,
    to: 1667452695199,
    reason: "Creating Timmy Plushies",
    hours: 40.5,
    approved: false,
  },
]);
</script>
