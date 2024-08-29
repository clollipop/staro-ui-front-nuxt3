import prismjs from "vite-plugin-prismjs";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Star博客",
      htmlAttrs: {
        lang: "zh-CN"
      },
      meta: [
        {name: "keywords", content: "Star博客,学习,技术,分享"},
        {name: "description", content: "Star博客 - 一个收藏回忆与分享技术的地方"},
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover"}
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://npm.elemecdn.com/@fortawesome/fontawesome-free/css/all.min.css",
          media: "all",
          onload: "this.media='all'"
        }
      ]
    }
  },
  devtools: {enabled: true},
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-svgo",
    "nuxt-viewport",
    '@pinia/nuxt',
    "@pinia-plugin-persistedstate/nuxt"
    // "@nuxtjs/stylelint-module",
  ],
  piniaPersistedstate: {
    storage: 'localStorage' // 持久化
  },
  svgo: {
    autoImportPath: "./static/svg/"
  },
  // baseUrl:,
  devServer: {
    port: 3200,
    host: "0.0.0.0"
  },
  nitro: {
    devProxy: {
      "/blog-api": {
        target: "http://localhost:48080/blog-api",
        changeOrigin: true,
        prependPath: true
      }
    }
  },
  // 代码高亮
  vite: {
    plugins: [
      prismjs({
        languages: [
          "java",
          "javascript",
          "css",
          "html",
          "xml",
          "yaml",
          "shell"
        ],
        plugins: ["line-numbers", "show-language", "copy-to-clipboard"],
        theme: "tomorrow",
        css: true
      })
    ],
    server: {
      hmr: true,
      watch: {
        usePolling: true
      }
    }
  }
});
