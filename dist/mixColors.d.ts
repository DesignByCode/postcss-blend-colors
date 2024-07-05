import { Color, InterpolationMode } from 'chroma-js';

declare const mixColors: (color1: string | Color, color2: string | Color, ratio?: number, mode?: InterpolationMode) => string;
export default mixColors;
