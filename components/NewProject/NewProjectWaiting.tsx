import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react-web";
import loading from "assets/svg/loading-icon.svg";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
const animation = require("/public/anim/time-management/time-management.json");

import { ContainerSM } from "components/elements";

// import timeManagement from "/public/images/loading.gif";

type Props = {};

const NewProject: React.FC<Props> = () => {
  return (
      <Container>
          <Row>
              <Col lg={{span: 8, offset: 2}}>
                  <Root>
                      <Title>Generating Artwork</Title>
                      <Text>For large collections (1000+) this may take some time.
                      <br />Please don't close the tab</Text>
                      {/* You can always come back later. */}

                      {/* <Lottie
          options={{
            animationData: animation,
          }}
        /> */}
                      <Image src={loading} />
                  </Root>
              </Col>
          </Row>
      </Container>
  );
};

export default NewProject;

const Root = styled.div`
    width: 100%;
  margin: 0 auto;
  padding: 38px 34px;
  border-radius: 20px;
  background: #ECF2FD;
  border: 1px solid #EAECEE;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.7;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 33px;
  padding-bottom: 16px;
`;
const Text = styled.p`
  font-size: 16px;
  color: #7377A9;
  font-weight: 400;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  margin: 40px auto;
  height: 270px;
`;

const Video = styled.video`
  display: block;
  width: 200px;
  margin: 0 auto;
`;
