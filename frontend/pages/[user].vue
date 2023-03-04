<script setup>
import { DialogTitle } from '@headlessui/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const open = ref(false);

const config = useRuntimeConfig();
const route = useRoute();

// Play the fast music.
const fart = () => {
  document.getElementById('myFart').play();
}

const { refresh, data: user } = await useFetch(
  `${config.API_BASE_URL}/${route.params.user}`
);

// Some validation schema with yup. 
// {Basic as fuck}
const addEventSchema = yup.object({
  title: yup.string().min(3).max(128).label('Title').required(),
  description: yup.string().min(3).max(264).label('Description').required(),
  startDate: yup.date().label('Start Date').required().min(new Date(), "Event can't start in the past."),
  endDate: yup.date().label('End Date').required().min(yup.ref('startDate'),
    "End Date can't be before start date")
});

const onSubmit = async (values) => {
  try {
    const id = route.params.user;

    await useFetch(`${config.API_BASE_URL}/${id}`, {
      method: 'POST',
      body: { ...values }
    })

    open.value = !open.value
    refresh();
  } catch (error) {
    console.log(error);
  }
}

</script>


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
            <div class="mt-6 min-w-0 flex-1 2xl:block">
              <h1 class="truncate text-2xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h1>
            </div>
            <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button type="button" @click="open = !open"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Create Event
              </button>
              <button @click="fart" type="button"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Fart on this user 💩
              </button>
              <audio id="myFart" src="/farts/diklolfart.mp3"></audio>
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
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 line-clamp-2">
                    Description</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Start date</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">End Date</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Created At</th>
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
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ event.createdAt.toLocaleString() }}
                  </td>
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
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Create a new event for this user.
          </DialogTitle>
          <div class="mt-2">
            <label class="block mt-2" for="title">
              <span class="text-left block field-required">Title</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="9/11" name="title" type="text" label="Title" />
              <ErrorMessage name="title" />
            </label>

            <label class="block mt-4" for="description">
              <span class="text-left block field-required">Description</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="All the essential details about your event..." name="description" type="text" as="textarea"
                label="Description" />
              <ErrorMessage name="description" />
            </label>

            <label class="block mt-4" for="startDate">
              <span class="text-left block field-required">Start Date</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@email.com" name="startDate" type="date" label="startDate" />
              <ErrorMessage name="startDate" />
            </label>

            <label class="block mt-4" for="endDate">
              <span class="text-left block field-required">End Date</span>
              <Field
                class="block w-full rounded-md border-0 mt-2 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="646-776-8214" name="endDate" type="date" label="End Date" />
              <ErrorMessage name="endDate" />
            </label>

          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button type="submit"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Create</button>
          <button type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            @click="open = false" ref="cancelButtonRef">Cancel</button>
        </div>
      </Form>
    </RegistrationModal>
  </div>
</template>

