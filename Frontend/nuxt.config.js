import colors from 'vuetify/es5/util/colors';

export default {
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL || 'localhost:5000',
    }
  },
  privateRuntimeConfig: {
    apiKey: process.env.apiKey || '',
    baseDomain: process.env.baseDomain || '',
  },
  env: {
    baseURL: process.env.baseURL || 'localhost:5000',
    apiKey: process.env.apiKey || '',
    baseDomain: process.env.baseDomain || '',
  },
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Oksa App',
    title: 'Oksa',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Oksa App'},
      {hid: 'og:image', name: 'og:image', propert: 'og:image', content: '/icon.png'},
      {hid: 'og:description', name: 'og:description', property: 'og:description', content: 'We will make you the enabling leader, who brings people together'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      },
    ],
    style: [],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/vuex-persist', ssr: false},
    {src: '~/plugins/notifier', ssr: false},
    {src: '~/plugins/axios', ssr: false},
    {src: '~/plugins/mask', ssr: false},
    {src: '~/plugins/FSS', ssr: false},
    {src: '~/plugins/mask', ssr: false},
    {src: '~/plugins/vueMasonry', ssr: false},
    {src: '~/plugins/vueMasonryCss', ssr: false},
    {src: '~/plugins/entrypoint', ssr: false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
      '~/components/admin',
      '~/components/archives',
      '~/components/common',
      '~/components/dashboard',
      '~/components/drawer_components',
      '~/components/icons',
      '~/components/kanban',
      '~/components/note',
      '~/components/profile',
      '~/components/share',
      '~/components/teams',
      '~/components/topic',
    ]
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
    credentials: false,
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/fonts/fonts.css'],
    optionsPath: '~/plugins/vuetify.js',
    treeShake: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // You can extend webpack config here
    // transpile: ['vue-masonry'],
    // extractCSS: true,
  },

  router: {
    middleware: 'darkmode',
  },

  server: {
    host: "0.0.0.0",
  },

  watchers: {
    webpack: {
      poll: true
    }
  },

  loadingIndicator: {
    name: 'three-bounce',
    color: '#F9BB22',
    background: 'white',
  },
  telemetry: false,
};
