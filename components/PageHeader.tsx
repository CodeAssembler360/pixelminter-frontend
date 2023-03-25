import React from "react";
import styled from "styled-components";
import { Container } from "components/elements";

type Props = {
  children?: React.ReactElement;
  title: string;
};

const PageHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <Root>
      <Container>
        <Title>{title}</Title>
        {children}
      </Container>
    </Root>
  );
};

export default PageHeader;

const Root = styled.div`
  padding-top: 250px;
  padding-bottom: 60px;
  margin-top: -80px;
  margin-bottom: 45px;
  color: #ffffff;
  text-align: center;
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 22px;
`;
