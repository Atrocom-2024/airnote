import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "default": "#4A68F5",
        "light-default": "#92A4F9",
        "black": "#141414",
        "light-black": "#494949",
        "white": "#FFFFFF",
        "dark-white": "#FAFAFA",
        "gray": "#C1C1C1",
        "dark-gray": "#6A6A6A",
        "white-gray": "#F5F5F5",
        "red": "#FF4242",
        "kakao": "#FFE812"
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
