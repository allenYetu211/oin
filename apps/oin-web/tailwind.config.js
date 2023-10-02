/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Email:  error: git config user.email & please set dead value or install git
 * @Date: 2023-09-05 18:10:39
 * @LastEditTime: 2023-10-01 11:25:16
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @FilePath: /oin/apps/oin-web/tailwind.config.js
 */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/theme');

console.log('__dirname', __dirname);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(
      __dirname,
      '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
