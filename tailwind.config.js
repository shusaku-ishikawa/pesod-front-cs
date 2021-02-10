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
