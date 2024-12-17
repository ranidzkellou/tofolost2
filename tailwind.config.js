
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './storybook/**/*.{js,jsx}', // Add this line so Storybook files are included
  
  ],
  theme: {
    extend: {
      colors: {

        customBlue: {
          lightest: '#F1F9FF',
          lighter: '#93D1FA',
          light: '#4DBEFF',
          DEFAULT: '#248AC9',
          dark: '#173E63',
        },

        websiteBack: "#F1F9FF",
        background: '#F0F9FF',
        bluemain:"#0190F8",

        priority: {
          // High priority colors
          high: {
            bg: '#DC2626',    // red-600 equivalent
            text: '#FEE2E2',  // red-100 equivalent
          },
          // Mid priority colors
          mid: {
            bg: '#EAB308',    // yellow-500 equivalent
            text: '#FEFCE8',  // yellow-50 equivalent
          },
          // Low priority colors
          low: {
            bg: '#22C55E',    // green-500 equivalent
            text: '#F0FDF4',  // green-50 equivalent
          }
        },

        primary: '#F0F9FF', 
        secondary: '#0074BA',
        accent: '#003E78',
        orange:'#E86B00',
      },
      

      fontFamily: {
        main: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
