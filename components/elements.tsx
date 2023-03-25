import styled from "styled-components";

export { default as Button } from "./Button";
export { default as TextField } from "./TextField";
export { default as Spinner } from "./Spinner";
export { default as Select } from "./Select";

export const Container = styled.div`
  width: 100%;
  max-width: 910px;
  margin: 0 auto;
  flex: 1 0 auto;
`;

export const ContainerSM = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  flex: 1 0 auto;
`;
