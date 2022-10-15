// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    shim: false
  },
  components: true,
  app: {
    head: {
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Fira+Sans',
          rel: 'stylesheet'
        }
      ]
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.MEILIKEY,
    // Keys within public, will be also exposed to the client-side
  }
})
