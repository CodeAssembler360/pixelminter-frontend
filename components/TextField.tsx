import React from "react";
import styled, { css } from "styled-components";

type Props = {
  id?: string;
  value?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  variant?: 1 | 2 | 3;
  startIcon?: any;
  endIcon?: any;
  onChange?: any;
  disabled?: boolean;
  width?: number;
  type?: any;
  min?: any;
  max?: any;
  as?: any;
};

const TextField: React.FC<Props> = ({
  id,
  label,
  name,
  value = "",
  variant = 1,
  placeholder,
  startIcon,
  endIcon,
  onChange = () => {},
  disabled,
  width,
  type = "text",
  min,
  max,
  as,
  ...rest
}) => {
  return (
    <Root width={width} variant={variant} {...rest} disabled={disabled}>
      {startIcon && <Icon image={startIcon} />}
      {label && <Label>{label}</Label>}
      <Input
        placeholder={placeholder}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        type={type}
        min={min}
        max={max}
        as={as}
        autoComplete="false"
      />
      {endIcon && endIcon}
    </Root>
  );
};

export default TextField;

const Root = styled.label<{
  variant: 1 | 2 | 3;
  disabled?: boolean;
  width?: number;
}>`
  display: block;
  overflow: hidden;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

const Input = styled.input<{ disabled?: boolean }>`
  display: block;
  width: 100%;
  outline: none;
  box-shadow: none;
  border: 0 none;
  padding: 0 10px;
  margin: 0;
  background: transparent;
  font-size: 11px;
  font-weight: 700;
  color: #0f123d;
  height: 28px;
  border: 0 none;
  border-radius: 3px;
  background: #dfdfdf;

  /* ${({ disabled }) =>
    disabled &&
    css`
      background: #f9f9f9;
    `} */
`;

const Icon = styled.div<{ image: string }>`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${({ image }) => image}) no-repeat 0 0;
  background-size: 100% auto;
  margin-right: 14px;
`;

const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;
