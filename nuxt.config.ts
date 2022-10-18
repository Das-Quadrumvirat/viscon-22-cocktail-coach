// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-meilisearch', '@pinia/nuxt'],
  typescript: {
    shim: false
  },
  components: true,
  app: {
    head: {
      htmlAttrs: [{ 'data-theme': 'dracula' }],
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Fira+Sans',
          rel: 'stylesheet'
        }
      ],
      title: 'Cocktail Coach',
      meta: [{ 'charset': 'utf-8' }]
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.MEILIKEY,
    meiliURL: process.env.MEILIURL,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiSearchKey: process.env.MEILI_SEARCH_KEY
    }
  },
  meilisearch: {
   hostUrl: process.env.MEILIURL,
   apiKey: process.env.MEILI_SEARCH_KEY,
   instantSearch: {
     theme: 'algolia'
   },
   clientOptions: {
    placeholderSearch: true,
    paginationTotalHits: 1000,
    finitePagination: true,
    primaryKey: undefined,
    keepZeroFacets: false
  }
}
})
