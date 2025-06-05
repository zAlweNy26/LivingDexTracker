import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'],
      },
    },
  },

  sourcemap: {
    client: 'hidden',
  },

  vite: {
    build: {
      rollupOptions: {
        external: ['sharp'],
      },
    },
  },

  ssr: true,

  modules: [
    'magic-regexp/nuxt',
    'motion-v/nuxt',
    'nuxt-lodash',
    'nuxt-security',
    'nuxt-zod-i18n',
    '@formkit/auto-animate/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@compodium/nuxt',
    'nuxt-vitalizer',
  ],

  runtimeConfig: {
    public: {
      version: pkg.version,
      auth: {
        redirectUserTo: '/dashboard',
        redirectGuestTo: '/auth',
      },
    },
  },

  css: ['~/assets/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-02-01',

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  compodium: {
    includeLibraryCollections: true,
    extras: {
      colors: {
        primary: 'emerald',
        neutral: 'stone',
      },
    },
  },

  hub: {
    analytics: true,
    kv: true,
    database: true,
    blob: true,
  },

  image: {
    quality: 100,
  },

  icon: {
    serverBundle: 'local',
    customCollections: [{
      prefix: 'logo',
      dir: './app/assets/icons',
    }],
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    disableTransition: false,
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
    debug: process.env.NODE_ENV === 'development',
  },

  vitalizer: {
    disablePrefetchLinks: true,
  },

  security: {
    nonce: true,
  },

  lodash: {
    prefix: '_',
  },

  zodI18n: {
    dateFormat: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    localeCodesMapping: {
      'en-GB': 'en',
      'en-US': 'en',
      'it-IT': 'it',
      'es-ES': 'es',
      'fr-FR': 'fr',
      'de-DE': 'de',
    },
  },

  i18n: {
    baseUrl: '',
    bundle: {
      optimizeTranslationDirective: false,
    },
    experimental: {
      typedPages: true,
      typedOptionsAndMessages: 'default',
      generatedLocaleFilePathFormat: 'off',
      alternateLinkCanonicalQueries: true,
    },
    compilation: {
      strictMessage: false,
    },
    locales: [
      {
        code: 'en',
        language: 'en-GB',
        name: 'English',
        file: 'en-GB.json',
        isCatchallLocale: true,
      },
      {
        code: 'it',
        language: 'it-IT',
        name: 'Italiano',
        file: 'it-IT.json',
      },
      {
        code: 'es',
        language: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      {
        code: 'de',
        language: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
    ],
    lazy: true,
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root',
    },
  },

  nitro: {
    routeRules: {
      '/img/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
      '/_ipx/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
      '/_nuxt/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/guide': { prerender: true },
    '/faqs': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/terms': { prerender: true },
    '/api/**': { cors: true },
  },

  $development: {
    devtools: {
      enabled: true,
      timeline: {
        enabled: true,
      },
    },
    seo: {
      debug: true,
    },
  },

  $production: {
    debug: false,
    devtools: {
      enabled: false,
    },
  },

  $env: {
    debug: {
      debug: true,
    },
  },
})
