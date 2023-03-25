import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "./Header";

type Props = {
  children: React.ReactElement;
  headerIsTransparent?: boolean;
  backgroundColor?: boolean;
};

const Layout: React.FC<Props> = ({ children, headerIsTransparent, backgroundColor }) => {
  return (
    <Wrapper>
      <Header transparent={headerIsTransparent} background={backgroundColor} />
      {React.cloneElement(children)}
    </Wrapper>
  );
};

export default Layout;

export const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 14px;
`;
