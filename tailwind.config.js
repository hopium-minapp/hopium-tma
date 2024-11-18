import colors from "./src/config/colors";
import fontSize from "./src/config/fontSize";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    fontSize,
    fontFamily: {
      roboto: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      determination: ["determination"],
    },
    extend: {
      boxShadow: {
        sm: "0px 0px 14px 0px rgba(0, 87, 255, 0.30)",
        task: "4px 4px 0px 0px #2B2B37",
        copy: "0px 4px 19px 0px rgba(255, 7, 107, 0.30)"
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      screens: {
        tall: { raw: "(min-height: 688px)" },
      },
    },
  },
  plugins: [],
};
