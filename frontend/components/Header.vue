<template>
  <header class="bg-white border-b">
    <nav class="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">My Company</span>
          <img
            class="animate-bounce hover:animate-none shadow-xl h-8 w-auto rounded-full object-cover hover:h-80 hover:rounded-sm "
            data-imgSrc="/images/new-home-oniichan.webp" src="/images/new-home-oniichan.webp" alt="" />
        </a>
      </div>
      <div class="flex lg:gap-x-12">
        <a rel="nofollow noopener noreferrer" target="_blank" v-for="item in navigation" :key="item.name"
          :href="item.href" class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
const navigation = [
  { name: 'Good morging', href: 'https://w.wallhaven.cc/full/p9/wallhaven-p9oj7j.jpg' },
]

</script>