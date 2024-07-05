import {describe, expect, it} from "vitest";
import postcss from "postcss";
import plugin from "src/index";

describe("# Testing regexColorMix", function () {
  it("should match mix() function with valid arguments", () => {
    const validExamples = [
      "mix(red, #00FF00, 10%)",
      "mix(red, #00FF00)",
      "mix(#FF0000, #00FF00, 0.6)",
      "mix(#FF0000, #00FF00, 1)",
      "mix(rgba(200,01,20, 0), #00FF00, 20%)",
      "mix(hsl(20,01%,20%), hsla(349, 100%, 50%, 1), 20%)",
    ]

    validExamples.forEach((example) => {
      const regexColorMix =
        /mix\((rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+),\s*(rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+)(?:,\s*([\d.]+)(?:%|\b))?\)/g
      expect(regexColorMix.test(example)).toBe(true)
    })
  })

  it("should not match mix() function with invalid arguments", () => {
    const invalidExamples = [
      'mix("red", #00FF00, 110%)',
      'mix("red", #00FF00, 10)',
      "mix(#FF0000, #00FF00, -1)",
      "mix(123, #00FF00, 10%)",
      'mix("red", "green", 10%)',
      "mix(#FF0000, #00FF00, 0.6, 1)",
      "mix(#FF0000, #00FF00, 1, 0.6)",
      "mix(#FF0000, #00FF00, 1, -1)",
      "mix(hsl(20,01%,20%),hsla(349, 100%, 50%, 1), 20%, 1)",
      "mix(hsl(20,01%,20%),hsla(349, 100%, 50%, 1), 20, 1)",
    ]

    invalidExamples.forEach((example) => {
      const regexColorMix =
        /mix\((rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+),\s*(rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+)(?:,\s*([\d.]+)(?:%|\b))?\)/g
      expect(regexColorMix.test(example)).toBe(false)
    })
  })
})

describe("postcss-mix-color plugin", () => {
  it("should mix colors in declarations by percentage", async () => {
    const inputCss = `
      .test {
        color: mix(#FF0000, #00FF00, 50%);
        background-color: mix(#0000FF, #FFFF00, 25%);
      }
    `

    const expectedCss = `
      .test {
        color: #b4b400;
        background-color: #b4b4b4;
      }
    `

    const result = await postcss([plugin]).process(inputCss, { from: undefined })
    expect(result.css).toEqual(expectedCss)
  })

  it("should mix colors in declarations without percentage or decimal", async () => {
    const inputCss = `
      .test {
        color: mix(#FF0000, #00FF00, 0.25);
        background-color: mix(#0000FF, #FFFF00, 0.5);
      }
    `

    const expectedCss = `
      .test {
        color: #dd8000;
        background-color: #b4b4b4;
      }
    `
    const result = await postcss([plugin]).process(inputCss, { from: undefined })
    expect(result.css).toEqual(expectedCss)
  })

  it("should mix colors in declarations by decimal", async () => {
    const inputCss = `
      .test {
        color: mix(#FF0000, #00FF00, 0.25);
        background-color: mix(#0000FF, #FFFF00, 0.25);
      }
    `

    const expectedCss = `
      .test {
        color: #dd8000;
        background-color: #8080dd;
      }
    `
    const result = await postcss([plugin]).process(inputCss, { from: undefined })
    expect(result.css).toEqual(expectedCss)
  })

  it("should skip", async () => {
    const inputCss = `
      .test {
        color: #dd8000;
        background-color: #8080dd;
      }
    `

    const expectedCss = `
      .test {
        color: #dd8000;
        background-color: #8080dd;
      }
    `
    const result = await postcss([plugin]).process(inputCss, { from: undefined })
    expect(result.css).toEqual(expectedCss)
  })



})
