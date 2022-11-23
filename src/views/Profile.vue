<template>
  <div class="h-full w-screen flex justify-center items-center">
    <div class="w-10/12 h-full min-h-0 min-w-0 flex flex-col">
      <span class="mt-8 block text-3xl w-full pb-4 border-b-2 border-brand">{{
        welcomeText
      }}</span>
      <form
        @submit.prevent="updateProfile"
        class="grid grid-cols-2 min-h-0 h-full"
      >
        <div class="h-full flex flex-0 flex-col min-h-0">
          <div class="mb-4">
            <span class="text-xl mt-2 mb-2 block underline">About me</span>
            <div class="space-y-4">
              <div class="flex flex-row justify-between flex-0">
                <label class="inline-block float-left">First Name</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-2 h-8 disabled:bg-slate-300 cursor-not-allowed w-36"
                  v-model="fn"
                  disabled
                />
                <label>Last Name</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-2 h-8 disabled:bg-slate-300 cursor-not-allowed pl-2 mr-4 w-36 float-right"
                  v-model="ln"
                  disabled
                />
              </div>
              <div class="flex flex-col space-y-4">
                <div>
                  <label class="inline-block w-32">Org Email</label>
                  <input
                    type="text"
                    class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 cursor-not-allowed pl-2 w-96 float-right"
                    v-model="orgEmail"
                    disabled
                  />
                </div>
                <div>
                  <label class="inline-block">
                    <VTooltip placement="bottom">
                      <span class="border-b-2 border-dashed border-gray-300"
                        >Personal Email</span
                      >
                      <template #popper>
                        <span class="text-xs">
                          Your personal email is used for some SS internal
                          services
                        </span>
                      </template>
                    </VTooltip>
                  </label>
                  <input
                    type="email"
                    class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 w-96 float-right"
                    v-model="personalEmail"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <span class="text-xl mt-4 mb-2 block underline"
              >Additional Info</span
            >
            <div class="flex flex-col space-y-4">
              <div>
                <label class="inline-block w-32">Department</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 pl-2 disabled:bg-slate-300 disabled:cursor-not-allowed float-right w-96"
                  v-model="dept"
                  :disabled="!needToSetup"
                />
              </div>
              <div>
                <label class="inline-block w-32">Team</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 pl-2 w-96 float-right disabled:bg-slate-300 disabled:cursor-not-allowed"
                  :disabled="!needToSetup"
                  v-model="team"
                />
              </div>
              <div>
                <label class="inline-block w-44">
                  <VTooltip placement="bottom">
                    <span class="border-b-2 border-dashed border-gray-300"
                      >Direct Supervisor</span
                    >
                    <template #popper>
                      <span class="text-xs">
                        The email of your direct supervisor
                      </span>
                    </template>
                  </VTooltip></label
                >
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 w-96 float-right disabled:cursor-not-allowed"
                  v-model="supervisor"
                  :disabled="!needToSetup"
                />
              </div>
              <div>
                <label class="inline-block w-32">Role</label>
                <select
                  v-model="role"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 w-96 float-right disabled:cursor-not-allowed"
                  :disabled="!needToSetup"
                >
                  <option selected>Associate</option>
                  <option>Manager</option>
                  <option>Director</option>
                  <option>Vice President</option>
                  <option>President</option>
                  <option v-if="!needToSetup">Corporate Officer</option>
                  <option v-if="!needToSetup">Executive Director</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-16 border-t-2">
            <span class="block">
              Contact Josef (pancakes#1412) to request any additional changes to
              your information.</span
            >
            <button
              class="rounded-md bg-green-300 w-24 p-2 disabled:grayscale disabled:cursor-not-allowed"
              type="submit"
              :disabled="!submittable"
            >
              Save
            </button>
          </div>
        </div>

        <div class="h-full flex flex-0 flex-col min-h-0 mt-0">
          <div class="mb-4 px-2">
            <span class="text-xl mt-2 mb-2 block underline"
              >Personal Information</span
            >
            <div class="space-y-4">
              <div class="flex flex-col space-y-4">
                <div>
                  <label class="inline-block">Phone Number</label>
                  <input
                    type="text"
                    class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 cursor-not-allowed pl-2 float-right"
                    v-model="phoneNumber"
                    disabled
                  />
                </div>
                <div>
                  <label class="inline-block">
                    <VTooltip placement="bottom">
                      <span class="border-b-2 border-dashed border-gray-300"
                        >Home Address</span
                      >
                      <template #popper>
                        <span class="text-xs">
                          Your address is used when confirming CS hour requests
                        </span>
                      </template>
                    </VTooltip>
                  </label>
                  <input
                    type="email"
                    class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 float-right"
                    v-model="personalAddress"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="px-2">
            <span class="text-xl mt-4 mb-2 block underline"
              >Your school/college</span
            >
            <div class="flex flex-col space-y-4">
              <div>
                <label class="inline-block w-32">Department</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 pl-2 disabled:bg-slate-300 disabled:cursor-not-allowed float-right w-96"
                  v-model="dept"
                  :disabled="!needToSetup"
                />
              </div>
              <div>
                <label class="inline-block w-32">Team</label>
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 pl-2 w-96 float-right disabled:bg-slate-300 disabled:cursor-not-allowed"
                  :disabled="!needToSetup"
                  v-model="team"
                />
              </div>
              <div>
                <label class="inline-block w-44">
                  <VTooltip placement="bottom">
                    <span class="border-b-2 border-dashed border-gray-300"
                      >Direct Supervisor</span
                    >
                    <template #popper>
                      <span class="text-xs">
                        The email of your direct supervisor
                      </span>
                    </template>
                  </VTooltip></label
                >
                <input
                  type="text"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 w-96 float-right disabled:cursor-not-allowed"
                  v-model="supervisor"
                  :disabled="!needToSetup"
                />
              </div>
              <div>
                <label class="inline-block w-32">Role</label>
                <select
                  v-model="role"
                  class="border-2 border-slate-500 rounded-md mx-4 h-8 disabled:bg-slate-300 pl-2 w-96 float-right disabled:cursor-not-allowed"
                  :disabled="!needToSetup"
                >
                  <option selected>Associate</option>
                  <option>Manager</option>
                  <option>Director</option>
                  <option>Vice President</option>
                  <option>President</option>
                  <option v-if="!needToSetup">Corporate Officer</option>
                  <option v-if="!needToSetup">Executive Director</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  getOrgEmail,
  getFirstName,
  getLastName,
  profileCompleted,
  getPersonalEmail,
  getImageUrl,
  updateUser,
  getRole,
  getSupervisorEmail,
  getUserTeam,
  getUserDepartment,
  getPersonalPhoneNumber,
  getPersonalAddress,
  getSchoolAddress,
  getSchoolNumber,
  getSchoolName,
  editUser,
} from "@/lib";
import type { SSUser } from "@/lib/types";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const needToSetup = ref(!profileCompleted());
const welcomeText = ref(
  needToSetup.value
    ? "Welcome! Please complete your profile."
    : "View profile info"
);
const fn = ref(getFirstName());
const ln = ref(getLastName());
const orgEmail = ref(getOrgEmail());
const team = ref(getUserTeam());
const dept = ref(getUserDepartment());
const personalEmail = ref(getPersonalEmail() || "");
const supervisor = ref(getSupervisorEmail());
const role = ref(getRole());
const phoneNumber = ref(getPersonalPhoneNumber() || "");
const personalAddress = ref(getPersonalAddress() || "");
const submittable = computed(() => {
  return team.value && dept.value && personalEmail.value && supervisor.value;
});
const schoolAddress = ref(getSchoolAddress() || "");
const schoolNumber = ref(getSchoolNumber() || "");
const schoolName = ref(getSchoolName() || "");

const updateProfile = async () => {
  const userData: SSUser = {
    completed: true,
    department: dept.value,
    firstName: fn.value,
    lastName: ln.value,
    orgEmail: orgEmail.value,
    personalInfo: {
      email: personalEmail.value,
      phoneNumber: phoneNumber.value,
      address: personalAddress.value,
      school: {
        address: schoolAddress.value,
        cellNumber: schoolNumber.value,
        name: schoolName.value,
      },
    },
    pfp: getImageUrl(),
    role: role.value,
    supervisor: supervisor.value,
    team: team.value,
    created: new Date().getTime(),
  };
  const resp = await editUser(orgEmail.value, userData);
  router.push("/");
};
</script>
