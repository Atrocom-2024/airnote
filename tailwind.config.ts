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
        "dark-default": "1B64DA",
        "default": "#0064FF",
        "light-default": "#66A2FF",
        "white": "#FFFFFF",
        "dark-white": "#F5F5F5",
        "light-gray": "D4D4D4",
        "middle-gray": "#9A9A9A",
        "gray": "#909090",
        "dark-gray": "#202632",
        "black": "#17171B",
        "light-black": "#494949",
        "red": "#FF4242",
        "kakao": "#FFE812"
      },
      boxShadow: {
        'sm': '0 4px 6px -1px rgb(0 0 0 / 0.03)'
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
