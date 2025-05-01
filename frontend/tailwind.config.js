export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",,
    ],
    theme: {
      extend: {
        color: {
          'furia': '#FF6F61',
          'furia-light': '#FFB3A0',
          'furia-dark': '#C94C3D',
          'furia-darkest': '#7A2A2A',
        },
        fontFamily: {
          'furia': ['Furia', 'sans-serif'],
      },
    },
    plugins: [],
  }
}