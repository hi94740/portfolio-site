import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: "service-worker",
    prerender: {
      crawlLinks: true
    }
  },
  runtimeConfig: {
    public: { apiBase: "", workerBase: "" }
  }
})
