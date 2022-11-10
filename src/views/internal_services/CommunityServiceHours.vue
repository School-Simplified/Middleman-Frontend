<template>
  <div class="min-h-0">
    <div class="my-2 flex flex-row justify-between">
      <span class="text-lg">Your CS Hour Logs</span>
      <div class="">
        <button
          type="button"
          @click="openForm"
          class="rounded-[3px] bg-grey p-2 text-white"
        >
          Create Log
        </button>
      </div>
      <TransitionRoot :show="isOpen" as="template">
        <Dialog as="div" @close="closeForm" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25"></div>
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-auto max-w-screen-2xl transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-screen"
                >
                  <DialogTitle as="h3" class="text-2xl font-medium leading-6"
                    >Add Volunteer Log</DialogTitle
                  >
                  <div class="mt-2">
                    <div class="flex flex-col items-center justify-center">
                      <div class="flex flex-row items-center space-x-5">
                        <form action="#" class="w-[700px] space-y-8">
                          <div>
                            <label
                              for="hours"
                              class="mb-2 block text-sm font-medium"
                              >Hours Served</label
                            >
                            <input
                              type="number"
                              id="Hours Served"
                              class="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
                              placeholder="e.g. 8"
                              required
                            />
                            <p
                              class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible"
                            >
                              Please input a number.
                            </p>
                          </div>
                          <div>
                            <label
                              for="datepicker"
                              class="mb-2 flex flex-row space-x-1 p-0 text-sm font-medium"
                            >
                              <p>From</p>
                              <ArrowRightIcon class="mt-0.5 h-4 w-4" />
                              <p>To</p>
                            </label>
                            <DatePickerVue
                              type="text"
                              id="datepicker"
                              class="w-inherit border-none bg-inherit"
                              required
                            />
                          </div>
                          <div class="sm:col-span-2">
                            <label class="mb-2 block text-sm font-medium"
                              >Reason</label
                            >
                            <textarea
                              rows="6"
                              maxlength="50"
                              required
                              class="peer block w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
                              placeholder="Reason for log..."
                            />
                            <p
                              class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible"
                            >
                              Please provide a reason.
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        @click="closeForm"
                        class="text-md rounded bg-white p-2 outline outline-1 outline-offset-[-1px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        @click="onSubmit"
                        class="text-md rounded bg-grey p-2 text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
    <table
      v-if="data.length > 0"
      class="block h-5/6 w-full table-auto overflow-y-scroll rounded-md border-2 border-slate-800 p-4"
    >
      <thead class="flex w-full justify-between">
        <th>From</th>
        <th>To</th>
        <th>Reason</th>
        <th>Approved</th>
      </thead>
      <tbody class="flex w-full flex-col">
        <tr
          v-for="csh in data"
          :key="csh.id"
          class="my-2 flex w-full justify-between justify-items-stretch rounded-md border-2 border-hovered p-2"
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
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import DatePickerVue from "../../components/DatePicker.vue";

const isOpen = ref(false);

function openForm() {
  isOpen.value = true;
}

function closeForm() {
  isOpen.value = false;
}

function onSubmit() {
  isOpen.value = false;
  // ... implement logic here
}

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
