import React from "react";
import styled from "styled-components";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  id?: string;
  label?: string;
  value?: string;
  onChange?: any;
  disabled?: boolean;
  width?: number;
  options: { value: string; label: string }[];
};

const Select: React.FC<Props> = ({
  id,
  label,
  value = "",
  onChange = () => {},
  disabled,
  width,
  options,
  ...rest
}) => {
  const selected = options.filter((option) => option.value === value)[0];

  return (
    <Root width={width} {...rest}>
      {selected ? selected.label : label}
      <IconWrapper>
        <FontAwesomeIcon icon={faAngleDown} />
      </IconWrapper>
      <StyledSelect
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option value={option.value} key={`${id}-${value}-${index}`}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </Root>
  );
};

export default Select;

const Root = styled.label<{ width?: number }>`
  position: relative;
  display: block;
  overflow: hidden;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: 28px;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 700;
  border: 0 none;
  border-radius: 3px;
  background: #dfdfdf;
  color: #0f123d;
  line-height: 28px;
  white-space: nowrap;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  display: block;
  width: 8px;
  transform: translateY(-50%);
`;

const StyledSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;
