/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#6D9695",
        inputColor:  "#8D6975",
        navbarColor: "#D3D1C0",
        labelColor: "#6C6C6C",
        white: "#fff",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        label: [
          "14px",
          {
            lineHeight: "normal",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        login: "2px 5px 50px 0px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};