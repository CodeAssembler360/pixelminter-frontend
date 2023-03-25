import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { theme } from "utils/theme";

const { mediaQuery, fonts } = theme;

export const typography = {};

export const Typography = styled(({ component, lineHeight, ...props }) =>
  React.createElement(component, props)
)`
  box-shadow: none;
  padding: 0;
  border: 0 none;
  background: transparent;
  outline: none;
  ${(props) => typography[props.variant]};
  opacity: ${(props) => props.opacity};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.align};
  cursor: ${(props) => (props.component === "button" ? "pointer" : "initial")};
`;

Typography.propTypes = {
  component: PropTypes.node,
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "caption",
    "caption2",
    "text",
    "text2",
  ]),
};

Typography.defaultProps = {
  component: "div",
  variant: "text",
};
