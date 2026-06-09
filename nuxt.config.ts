export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: "2026-05-27",

  css: ["~/assets/css/main.css"],

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:8000/api",
    },
  },

  typescript: {
    strict: true,
  },
});
