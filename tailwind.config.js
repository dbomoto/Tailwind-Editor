module.exports = {
  // Disable jit when generating basic tailwind css
  mode: 'jit',
  purge: [
    // Use below if using npm run webpage
    './pages/webpage.txt'
    // Use below if using npm run tailwind
    // './views/editor.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
