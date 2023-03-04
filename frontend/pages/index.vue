
<script setup>
import { DialogTitle } from '@headlessui/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const open = ref(false)

const config = useRuntimeConfig();

const { refresh, data: users } = await useFetch(`${config.API_BASE_URL}`);

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const registrationSchema = yup.object({
  firstName: yup.string().label('Fist Name').required(),
  lastName: yup.string().label('Last Name').min(3).max(64).required(),
  email: yup.string().label('Email').min(3).max(64).required().email(),
  phoneNumber: yup.string().label('Phone Number').matches(phoneRegExp, 'Phone Number is not valid')
});

const deleteUser = async (id, e) => {
  e.target.closest('tr').classList.add('bg-red-600/30');

  setTimeout(async () => {
    await useFetch(`${config.API_BASE_URL}/${id}`, {
      method: "DELETE"
    })
    refresh();
  }, 500);
}

const onSubmit = async (values) => {
  try {
    await useFetch(`${config.API_BASE_URL}/users`, {
      method: 'POST',
      body: { ...values }
    })

    // After validating the data we call the closeModal function;
    open.value = false
    refresh();
  } catch (error) {
    console.log('Error');
  }
}
</script>

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
                <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Events
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
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                  {{ user.lastName }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.phoneNumber }}
                </td>
                <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {{ user.events.length }}
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
      <Form @submit="onSubmit" :validationSchema="registrationSchema">
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Register a new user.
          </DialogTitle>
          <div class="mt-2">
            <label class="block mt-2" for="firstName">
              <span class="text-left block field-required">First Name</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Rodrigo" name="firstName" type="text" label="First Name" />
              <ErrorMessage name="firstName" />
            </label>

            <label class="block mt-4" for="lastName">
              <span class="text-left block field-required">Last Name</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Suarez" name="lastName" type="text" label="Last Name" />
              <ErrorMessage name="lastName" />
            </label>

            <label class="block mt-4" for="email">
              <span class="text-left block field-required">Email</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@email.com" name="email" type="email" label="Email" />
              <ErrorMessage name="email" />
            </label>

            <label class="block mt-4" for="phoneNumber">
              <span class="text-left block field-required">Phone Number</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="646-776-8214" name="phoneNumber" type="tel" label="Phone Number" />
              <ErrorMessage name="phoneNumber" />
            </label>

          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button type="submit"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Sign
            up</button>
          <button type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            @click="open = false" ref="cancelButtonRef">Cancel</button>
        </div>
      </Form>
    </RegistrationModal>
  </div>
</template>
