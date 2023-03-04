<template>
  <div class="max-w-7xl mx-auto">
    <article>
      <!-- Profile header -->
      <div>
        <img class="h-64 w-full object-cover lg:h-96 object-top" src="/images/fuckedup.webp" alt="coverImage" />
      </div>
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img title="You're going to jail."
              class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover bg-gray-500"
              src="https://www.loliapi.com/acg/pe/" alt="" />
          </div>
          <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
              <h1 class="truncate text-2xl font-bold text-gray-900">{{ user.name }}</h1>
            </div>
            <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button type="button" @click="open = !open"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Create Event
              </button>
              <button type="button"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Fart on this user
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
          <h1 class="truncate text-2xl font-bold text-gray-900">{{ user.name }}</h1>
        </div>
      </div>
    </article>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr :class="{ 'opacity-50 select-none': user.events.length === 0 }">
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title
                  </th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Start date</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">End Date</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="user.events.length !== 0" class="divide-y divide-gray-200">
                <tr v-for="event in user.events" :key="event._id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ event.title }}
                  </td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ event.description }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ event.startDate }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ event.endDate }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" class="text-red-600 hover:text-red-900">Delete<span class="sr-only">, {{ event._id
                    }}</span></a>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" class="whitespace-nowrap p-4 text-sm font-medium text-gray-900 sm:pl-0 text-center">No
                    events</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <RegistrationModal :open="open" @closeModal="open = !open">
      <Form @submit="onSubmit" :validationSchema="addEventSchema">
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
              <ErrorMessage name="firstName" />
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

<script setup>
import { DialogTitle } from '@headlessui/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const open = ref(false);

const config = useRuntimeConfig();
const route = useRoute();

const { refresh, data: user } = await useFetch(
  `${config.API_BASE_URL}/${route.params.user}`
);

const addEventSchema = yup.object({
  firstName: yup.string().label('Fist Name').required(),
  lastName: yup.string().label('Last Name').min(3).max(64).required(),
  email: yup.string().label('Email').min(3).max(64).required().email(),
});

const onSubmit = (values) => {
  try {
    console.log(values);

  } catch (error) {
    console.log(error);
  }
}

</script>
