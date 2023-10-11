const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/theme');

console.log(
  'tailwind css config ',
  `${join(
    __dirname,
    '{src,pages,components,app,view}/**/*!(*.stories|*.spec).{ts,tsx,html}'
  )}`
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app,view}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    //  handle ui components
    join(__dirname, '../../libs/ui/**/*!(*.stories|*.spec).{ts,tsx,html}'),
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
