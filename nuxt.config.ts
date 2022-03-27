export default {
  ssr: false,
  head: {
    title: 'vue-web3',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: ['~/assets/scss/mixins/index.scss', '~/assets/scss/_color.scss']
  },
  plugins: [
    {
      src: '~/plugins/notifications-ssr',
      ssr: true
    },
    {
      src: '~/plugins/notifications-client',
      ssr: false
    }
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources'
  ],
  modules: [],
  build: {},
  env: {
    CFI_TOKEN: process.env.CFI_TOKEN,
    USDT_TOKEN: process.env.USDT_TOKEN,
    DLD_TOKEN: process.env.DLD_TOKEN,
    WSS_RINKEBY: process.env.WSS_RINKEBY
  }
}
