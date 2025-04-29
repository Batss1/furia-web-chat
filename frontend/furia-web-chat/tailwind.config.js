export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",,
    ],
    theme: {
      extend: {
        color: {
          'furia-red': '#FF4600',
          'furia-black': '#000000',
        },
        fontFamily: {
          'furia': ['"Exo 2"', 'sans-serif'],
      },
    },
    plugins: [],
  }
}