import chroma, { Color, InterpolationMode } from 'chroma-js';

const mixColors = (color1: string | Color, color2: string | Color, ratio: number = 0.5, mode?: InterpolationMode): string => {
  if (ratio < 0 || ratio > 1) {
    ratio = 0.5;
  }
  return chroma.mix(color1, color2, ratio, mode).css();
};

export default mixColors;