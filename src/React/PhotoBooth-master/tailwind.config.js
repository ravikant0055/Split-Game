/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // function ({ addUtilities }) {
    //   addUtilities({
    //     '.scrollbar-custom::-webkit-scrollbar': {
    //       width: '6px',
    //     },
    //     '.scrollbar-custom::-webkit-scrollbar-thumb': {
    //       backgroundColor: '#e9e9e9',
    //       borderRadius: '20px',
    //     },
    //     '.scrollbar-custom::-webkit-scrollbar-track': {
    //       backgroundColor: '#00000',
    //     },
    //   })
    // }
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          /* For Firefox */
          'scrollbar-width': 'none',
          /* For Webkit-based browsers (Chrome, Safari, Edge) */
          '-ms-overflow-style': 'none', 
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
}

