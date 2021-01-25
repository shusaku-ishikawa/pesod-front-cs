module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
        "-2": "-2"
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
