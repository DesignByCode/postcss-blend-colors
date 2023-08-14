const chroma = require("chroma-js")
const mixColors = require("./mixColors")

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: "postcss-blend-colors",
    Root(root, postcss) {
      root.walkDecls(function (decl) {
        if (decl.value.includes("mix(")) {
          const regex = /mix\((rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+),\s*(rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+)(?:,\s*([\d.]+)(?:%|\b))?\)/g
          const matches = regex.exec(decl.value)
          if (matches) {
            const color1 = matches[1].trim()
            const color2 = matches[2].trim()
            const ratio = parseFloat(matches[3]) || 0.5
            const blendedColor = mixColors(color1, color2, ratio)
            decl.value = decl.value.replace(matches[0], chroma(blendedColor).hex("rgb"))
          }
        }
      })
    },
  }
}

module.exports.postcss = true
