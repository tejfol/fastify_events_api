// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  css: ["@/styles/main.scss"],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || "http://127.0.0.1:8080",
    },
  },

  app: {
    head: {
      title: "Storms named after people",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: process.env.npm_package_description || "",
        },
      ],
      link: [{ rel: "icon", type: "image/gif", href: "/favicon.gif" }],
    },
  },
});
