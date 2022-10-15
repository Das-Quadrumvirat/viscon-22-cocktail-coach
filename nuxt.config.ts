// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-meilisearch', '@pinia/nuxt'],
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
    // Keys within public, will be also exposed to the client-side
    public: {
      apiSearchKey: '0ce4e8a6b5e30dcd5a383a4c764d47c553a7039f5c4e62cc9ac871e7c8a3b9d7'
    }
  },
  meilisearch: {
   hostUrl: 'https://meili.cocktailcoach.vypxl.io/',
   apiKey: '0ce4e8a6b5e30dcd5a383a4c764d47c553a7039f5c4e62cc9ac871e7c8a3b9d7',
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
