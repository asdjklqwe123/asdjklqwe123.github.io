// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://asdjklqwe123.github.io',
  base: '/',
  trailingSlash: 'never',

  // 开发服务器配置
  server: {
    host: true
  },

  // Markdown 配置
  markdown: {
    syntaxHighlight: 'shiki'
  }
})
