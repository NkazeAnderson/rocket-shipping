import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#FF6B2B",
      black: "#000000",
      white: "#FFFFFC",
      "light-gray": "#F7F5F4",
      success: "#008060",
      danger: "#FF3232",
      "dark-gray": "#656565",
      brown: "#471F0E",
    },
    spacing: {
      "0": "0px",
      "8": "8px",
      "16": "16px",
      "24": "24px",
      "32": "32px",
      "40": "40px",
      "48": "48px",
      "96": "96px",
    },
    borderRadius: {
      15: "15px",
      30: "30px",
      45: "45px",
      full: "5555",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
