module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   gray: colors.coolGray,
    //   blue: colors.lightBlue,
    //   red: colors.rose,
    //   pink: colors.fuchsia,
    // },
    extend: {
      colors: {
        gray: {
          100: '#DADADA',
          200: '#B4B4B4',
        },
        blue: {
          100: '#C4E2FF',
          200: '#0AA2E8'
        }
      },
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
