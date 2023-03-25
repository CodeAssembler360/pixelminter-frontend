import { css } from "styled-components";
import { colors, dimensions, fonts } from "./styles";

const mediaQuery = {};

Object.keys(dimensions).forEach(function (item) {
  mediaQuery[item] = (...args) => css`
    @media (min-width: ${dimensions[item]}px) {
      ${css(...args)};
    }
  `;
});

export const theme = {
  palette: colors,
  breakpoints: dimensions,
  fonts: fonts,
  mediaQuery: mediaQuery,
  spacing: (space) => `${space * 5}px`,
  color: (palette, tone) => {
    if (typeof colors[palette] === "string") return colors[palette];
    if (colors[palette] && !tone) return colors[palette].normal;
    if (colors[palette] && colors[palette][tone]) return colors[palette][tone];
    console.error(`No such color '${palette}.${tone}' in stack`);
    return null;
  },
};
