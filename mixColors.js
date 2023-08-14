const chroma = require("chroma-js")

const mixColors = (color1, color2, ratio = 0.5, mode) => {
  if (ratio === null || (ratio > 1 && ratio > 1)) {
    ratio = 0.5
  }
  return chroma.mix(color1, color2, ratio, mode).css()
}

module.exports = mixColors
