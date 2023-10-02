/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Email:  error: git config user.email & please set dead value or install git
 * @Date: 2023-09-05 17:50:50
 * @LastEditTime: 2023-10-01 19:53:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @FilePath: /oin/apps/oin-web/vite.config.ts
 */
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import basicSsl from '@vitejs/plugin-basic-ssl'


export default defineConfig({
  cacheDir: '../../node_modules/.vite/oin-web',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [basicSsl(), react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
