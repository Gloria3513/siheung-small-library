import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          100: "#E8F5E0",
          300: "#8CB86B",
          500: "#4A7C28",
          700: "#2D5016",
          900: "#1A3009",
        },
        warm: {
          100: "#FFF3D0",
          300: "#D4B84A",
          500: "#B8941E",
          700: "#8B6914",
          900: "#5C4510",
        },
        cream: "#FFF8E7",
        ivory: "#FFFDF5",
        "warm-gray": {
          100: "#F0EDE8",
          300: "#C5C0B8",
          500: "#7A7570",
          700: "#4A4540",
        },
      },
      fontFamily: {
        pretendard: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
