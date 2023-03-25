import React from "react";
import styled, { css } from "styled-components";

import plusIcon from "assets/svg/icons/plus.svg";

const iconsByName = {
  plus: plusIcon,
};

type ButtonProps = {
  children?: React.ReactNode;
  badge?: string;
  variant?: "secondary" | "primary" | "outlined";
  color?: "pink" | "black";
  endIcon?: any;
  startIcon?: string;
  onClick?: any;
  type?: "submit" | "button";
  size?: "small";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  startIcon,
  endIcon,
  size,
  disabled = false,
  variant = "primary",
  ...rest
}) => {
  return (
    <Root
      variant={variant}
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
      {...rest}
      size={size}
    >
      <Inner>
        {startIcon &&
          typeof startIcon === "string" &&
          iconsByName[startIcon] && (
            <StartIcon image={iconsByName[startIcon]} />
          )}
        {children}
        {endIcon && <EndIcon image={endIcon} />}
      </Inner>
    </Root>
  );
};

export default Button;

const Root = styled.button<{
  size?: string;
  variant: string;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #ffffff;
  border: 0 none;
  box-shadow: none;
  outline: none;
  margin: 0;
  font-weight: 700;
  cursor: pointer;
  padding: 15px 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 45px;
  height: 45px;
  position: relative;
  overflow: hidden;

  ${({ size }) =>
    size === "small" &&
    css`
      height: 28px;
      padding: 7px 20px;
      font-size: 10px;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}

  ${({ variant, size }) =>
    variant === "primary" &&
    css`
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.38;
        background: #fd576c;
        border-radius: 45px;
        transition: opacity 0.2s ease;

        ${size === "small" &&
        css`
          display: none;
        `}
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        left: 5px;
        right: 5px;
        bottom: 4px;
        background: #fd576c;
        border-radius: 45px;

        ${size === "small" &&
        css`
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      }

      &:hover {
        &:before {
          opacity: 0.5;
        }
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    css`
      background: #f1ebeb;
      color: #0f123d;
    `}
`;

const Inner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  line-height: 0.1;
`;

const Icon = styled.span<{ image: string }>`
  display: block;
  width: 18px;
  height: 18px;
  background: url(${({ image }) => image}) no-repeat 0 0;
  background-size: 100% auto;
`;

const StartIcon = styled(Icon)`
  margin-right: 8px;
`;

const EndIcon = styled(Icon)`
  margin-left: 8px;
`;
