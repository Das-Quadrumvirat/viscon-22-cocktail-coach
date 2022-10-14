// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    typescript: {
        shim: false
    },
    app: {
        head: {
            link: [
                {
                    href: 'https://fonts.googleapis.com/css2?family=Fira+Sans',
                    rel: 'stylesheet'
                }
            ]
        }
    }
})
