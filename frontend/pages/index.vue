<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in our database including their Fist Name, Last Name,
          Email and Phone Number.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button @click="open = !open" type="button"
          class="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  First Name
                </th>
                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Last Name
                </th>
                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Phone Number
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.email">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {{ user.firstName }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.lastName }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.phoneNumber }}
                </td>
                <td
                  class="transition-all duration-300 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium gap-4 flex w-full">
                  <NuxtLink :to="user._id" class="ml-auto block text-indigo-600 hover:text-indigo-900">
                    Events
                  </NuxtLink>
                  <button @click="($event) => deleteUser(user._id, $event)" type="button"
                    class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <RegistrationModal :open="open" @closeModal="open = !open">
      <div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Register a new user.
          </DialogTitle>
          <div class="mt-2">
            Here should go the validation
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button type="button"
          class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          @click="registerUser">Sign up</button>
        <button type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          @click="open = false" ref="cancelButtonRef">Cancel</button>
      </div>
    </RegistrationModal>
  </div>
</template>

<script setup>
import { DialogTitle } from '@headlessui/vue'

const open = ref(false)

const config = useRuntimeConfig();

const { refresh, data: users } = await useFetch(`${config.API_BASE_URL}`);

const deleteUser = async (id, e) => {
  e.target.closest('tr').classList.add('bg-red-600/30');

  setTimeout(async () => {
    await useFetch(`${config.API_BASE_URL}/${id}`, {
      method: "DELETE"
    })
    refresh();
  }, 500);
}

const registerUser = () => {
  console.log('register');
  // After validating the data we call the closeModal function;
  open.value = false
}

</script>
