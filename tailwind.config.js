module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de incluir tus archivos React
  ],
  theme: {
    extend: {
		fontFamily: { sans: ['Inter', 'sans-serif'], },
	},
  },
  plugins: [],
}