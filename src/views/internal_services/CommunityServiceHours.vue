<template>
  <div class="min-h-0 h-full flex flex-col">
    <div class="flex flex-row justify-between my-2">
      <span class="text-lg">Your CS Hour Logs</span>
      <div class="flex">
        <button
          type="button"
          @click="openForm"
          class="rounded-md bg-grey p-2 text-white border-2 border-grey"
        >
          Create Log
        </button>
        <Popover class="block" v-if="logCheckOutQueue.length > 0">
          <PopoverButton class="rounded-md border-grey border-2 p-2 ml-2"
            >Checkout Logs</PopoverButton
          >
          <PopoverPanel class="absolute z-10">
            <div
              class="p-4 shadow-md bg-chalk rounded-md flex justify-center flex-col"
            >
              <label class="mb-4">Are you sure?</label>
              <br />
              <button
                class="bg-green-200 hover:bg-green-400 p-2 rounded-md"
                @click="checkoutLogs()"
              >
                Yes
              </button>
            </div>
          </PopoverPanel>
        </Popover>
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
                              v-model="hours"
                            />
                            <p
                              v-if="hours <= 0"
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
                            <DatePicker
                              type="text"
                              id="datepicker"
                              class="w-inherit border-none bg-inherit"
                              required
                              v-model="breakDuration"
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
                              v-model="reason"
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
      v-if="requestedLogs.length > 0"
      class="w-full table-auto overflow-y-scroll rounded-md border-2 border-slate-800 border-collapse p-4"
    >
      <tr class="text-left">
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">
          Requester
        </th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">From</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">To</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">Reason</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">Status</th>
        <th
          class="p-4 bg-slate-300 border-b-2 border-l-2 border-slate-700"
          v-if="logsCanCheckOut.length > 0"
        >
          Action
        </th>
      </tr>
      <tbody class="">
        <tr
          v-for="csh in requestedLogs"
          :key="csh.id"
          class="w-full rounded-md p-4"
          :class="{
            'bg-slate-100': csh.approved !== undefined,
          }"
        >
          <td class="p-4">
            {{ csh.requester }}
          </td>
          <td class="p-4">
            {{ csh.from.toDate().toLocaleDateString() }}
          </td>
          <td class="p-4">
            {{ csh.to.toDate().toLocaleDateString() }}
          </td>
          <td class="p-4">
            {{ csh.reason }}
          </td>
          <td
            class="p-4"
            :class="{
              'border-r-2 border-slate-700': logsCanCheckOut.length > 0,
            }"
          >
            <span v-if="csh.checkedOut">Checked Out</span>
            <span v-else-if="csh.approved === true">Approved</span>
            <span v-else-if="csh.approved === false">Rejected</span>
            <span v-else>Waiting</span>
          </td>
          <td v-if="csh.approved && !csh.checkedOut" class="p-4">
            <input
              type="checkbox"
              class="hue-rotate-30 filter"
              @input="(e) => toggleLogCheckout(e, csh)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>You have no CS hour logs.</p>
  </div>
  <div class="flex flex-col min-h-0 h-full" v-if="showApprovalTable">
    <span class="my-2">Log Requests</span>
    <table
      class="w-full table-auto overflow-y-scroll rounded-md border-2 border-slate-800 border-collapse p-4"
    >
      <tr class="text-left">
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">
          Requester
        </th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">From</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">To</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">Reason</th>
        <th class="p-4 bg-slate-300 border-b-2 border-b-slate-700">Action</th>
      </tr>
      <tbody class="">
        <tr
          v-for="csh in logsToVerify"
          :key="csh.id"
          class="w-full rounded-md p-4"
          :class="{
            'bg-slate-100': csh.approved !== undefined,
          }"
        >
          <td class="p-4">
            {{ csh.requester }}
          </td>
          <td class="p-4">
            {{ csh.from.toDate().toLocaleDateString() }}
          </td>
          <td class="p-4">
            {{ csh.to.toDate().toLocaleDateString() }}
          </td>
          <td class="p-4">
            {{ csh.reason }}
          </td>
          <td class="flex items-center w-16 space-x-2 justify-center p-4">
            <Popover
              class="relative min-h-0"
              v-if="
                csh.approved == null ||
                (csh.approved == undefined && !csh.checkedOut)
              "
            >
              <PopoverButton>
                <CheckIcon
                  class="h-6 w-6 border-2 border-green-400 rounded-lg p-1 hover:bg-green-100"
              /></PopoverButton>

              <PopoverPanel
                v-slot="{ close }"
                class="fixed z-10 bg-green-100 border-green-400 border-2 p-4 rounded-md"
              >
                <span>Are you sure?</span>
                <br />
                <button
                  class="bg-green-400 text-chalk p-2 rounded-md"
                  @click="approveCsLog(csh, close)"
                >
                  Yes
                </button>
              </PopoverPanel>
            </Popover>
            <Popover
              class="relative min-h-0"
              v-if="csh.approved == null || csh.approved == undefined"
            >
              <PopoverButton>
                <XMarkIcon
                  class="h-6 w-6 border-2 border-red-400 rounded-lg p-1 hover:bg-red-100"
              /></PopoverButton>

              <PopoverPanel
                v-slot="{ close }"
                class="fixed z-10 bg-red-100 border-red-400 border-2 p-4 rounded-md"
              >
                <span>Are you sure?</span>
                <br />
                <button
                  class="bg-red-400 text-chalk p-2 rounded-md"
                  @click="rejectCsLog(csh, close)"
                >
                  Yes
                </button>
              </PopoverPanel>
            </Popover>
            <span v-else-if="csh.checkedOut">Checked Out</span>
            <span v-else-if="csh.approved">Approved</span>
            <span v-else>Rejected</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  createCsLog,
  getCsLogsFromUser,
  getOrgEmail,
  isAssociate,
  getLogsToVerify,
  rejectLog,
  verifyLog,
  checkoutCsLog,
} from "@/lib";
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import DatePicker from "../../components/DatePicker.vue";
import type { CSHLog } from "@/lib/types";
const showApprovalTable = ref(!isAssociate());
const breakDuration = ref({
  startDate: "",
  endDate: "",
});
const isOpen = ref(false);
const reason = ref("");
const hours = ref(0);
function openForm() {
  isOpen.value = true;
}
function toggleLogCheckout(e: Event, log: CSHLog) {
  if ((e.target as HTMLInputElement).checked) {
    logCheckOutQueue.value.push(log);
  } else {
    const mapped = logCheckOutQueue.value.map((l) => l.id);
    const index = mapped.indexOf(log.id);
    logCheckOutQueue.value.splice(index, 1);
  }
  console.log(logCheckOutQueue.value);
}
const logsToVerify = ref(await getLogsToVerify());
const requestedLogs = ref(await getCsLogsFromUser(getOrgEmail()));
const logsCanCheckOut = requestedLogs.value.filter(
  (log) => log.checkedOut == false
);
const logCheckOutQueue = ref<CSHLog[]>([]);

async function rejectCsLog(log: CSHLog, close: any) {
  const newLog = await rejectLog(log.id);
  log.approved = false;
  close();
}
async function approveCsLog(log: CSHLog, close: any) {
  const newLog = await verifyLog(log.id);
  log.approved = true;
  close();
}
function closeForm() {
  isOpen.value = false;
}

async function onSubmit() {
  isOpen.value = false;
  const newLog = await createCsLog(
    reason.value,
    hours.value,
    new Date(breakDuration.value.startDate),
    new Date(breakDuration.value.endDate)
  );
  requestedLogs.value.push(newLog);
}

const checkoutLogs = async () => {
  await checkoutCsLog(logCheckOutQueue.value);
  alert("You will get an email with your certificate soon.");
};
</script>
