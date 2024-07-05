import { Plugin } from 'postcss';
import chroma from 'chroma-js';
import mixColors from './mixColors';

const postcssBlendColors: Plugin = {
  postcssPlugin: 'postcss-blend-colors',
  Root(root) {
    root.walkDecls((decl) => {
      if (decl.value.includes('mix(')) {
        const regex = /mix\((rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+),\s*(rgba?\([^)]*\)|hsla?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-z]+)(?:,\s*([\d.]+)(?:%|\b))?\)/g;
        const matches = regex.exec(decl.value);
        if (matches) {
          const color1 = matches[1].trim();
          const color2 = matches[2].trim();
          const ratio = parseFloat(matches[3]) || 0.5;
          const blendedColor = mixColors(color1, color2, ratio);
          decl.value = decl.value.replace(matches[0], chroma(blendedColor).hex('rgb'));
        }
      }
    });
  },
};

export default postcssBlendColors;