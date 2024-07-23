// const {nextui} = require('@nextui-org/theme');
// /** @type {import('tailwindcss').Config} */
// const {nextui} = require("@nextui-org/theme");
// module.exports = {
//
  // content: [
  //   "//     ./app/**/*.{js,ts,jsx,tsx,mdx}",
  //   "//     ./pages/**/*.{js,ts,jsx,tsx,mdx}",
  //   "//     ./components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "//     // Or if using src directory:\n//     ./src/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./node_modules/@nextui-org/theme/dist/components/(button|image|spinner|ripple).js"
  // ],
//   theme: {
//     extend: {},
//   },
//
  // plugins: [nextui()],
//   darkMode: "class",
//   plugins: [nextui()],
// }
// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}