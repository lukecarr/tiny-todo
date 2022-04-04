import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    preact(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
