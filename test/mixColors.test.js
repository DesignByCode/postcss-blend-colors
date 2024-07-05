import {describe, expect, it} from "vitest";
import mixColors from "src/mixColors";

describe("# Color mix", () => {
  it("should mix red and blue and get rgb(180,0,180)", () => {
    expect(mixColors("red", "blue")).toBe("rgb(128,0,128)")
  })

  it("should mix red and blue at 75% and get rgb(128,0,221)", () => {
    expect(mixColors("red", "blue", 0.75)).toBe("rgb(64,0,191)")
  })

  it("should reset ratio if out of range mix red and blue at 175% and get rgb(180,0,180)", () => {
    expect(mixColors("red", "blue", 1.2)).toBe("rgb(128,0,128)")
  })



})
