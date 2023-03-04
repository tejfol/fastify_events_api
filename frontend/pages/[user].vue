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
            <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover bg-gray-500"
              src="https://www.loliapi.com/acg/pe/" alt="" />
          </div>
          <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
              <h1 class="truncate text-2xl font-bold text-gray-900">{{ user.name }}</h1>
            </div>
            <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button type="button"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Create Event
              </button>
              <button type="button"
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Call him a stupid or contemptible person.
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
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const { refresh, data: user } = await useFetch(
  `${config.API_BASE_URL}/${route.params.user}`
);

</script>
