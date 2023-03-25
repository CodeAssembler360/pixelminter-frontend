import React from "react";
import styled from "styled-components";

import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  ProgressBar,
} from "react-bootstrap";

import mintIcon from "assets/svg/mintIcon.svg";

import Eth from "assets/svg/eth-icon.svg";
import facebook from "assets/svg/facebook.svg";
import twitter from "assets/svg/twitter.svg";
import instagram from "assets/svg/instagram.svg";
import gmail from "assets/svg/gmail.svg";

const Minting = () => {
  return (
    <>
      <Space></Space>
      <Container>
        <Row>
          <Col lg={4}>
            <div className="position-relative">
              <img className="w-100" src={mintIcon} alt="" />
            </div>
          </Col>
          <Col lg={8}>
            <div className="d-flex align-items-start flex-column flex-wrap align-content-between px-xl-5 mx-xl-3 py-3">
              <div>
                <Title>
                  Corporate Escapee <OnlineStatus>Available</OnlineStatus>
                </Title>
                <div className="d-flex justify-content-start mb-4">
                  <div className="pe-4">
                    <SubTitle>Collection Total</SubTitle>
                    <Status>102</Status>
                  </div>
                  <div className="px-4 border-start border-end">
                    <SubTitle>NFT's in Collection Sold</SubTitle>
                    <Status>10</Status>
                  </div>
                  <div className="ps-4">
                    <SubTitle>NFT's in Collection Remaining</SubTitle>
                    <Status>2</Status>
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="pe-4">
                    <SubTitle>Royalty Percentage</SubTitle>
                    <Status>30.00%</Status>
                  </div>
                  <div className="ps-4">
                    <SubTitle>Collection Rarity</SubTitle>
                    <Status>Common</Status>
                  </div>
                </div>
                <div className="mb-5">
                  <SubTitle>Cost for Minting</SubTitle>
                  <Status className="d-flex">
                    0.00046
                    <img className="ms-4" src={Eth} alt="" />
                  </Status>
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-between w-100">
                <Button className="rounded-pill mb-4" type="button">
                  Mint Now
                </Button>
                <div className="d-flex align-items-center gap-3">
                  Contact the Artist:
                  <a href="#">
                    <img src={facebook} alt="" />
                  </a>
                  <a href="#">
                    <img src={twitter} alt="" />
                  </a>
                  <a href="#">
                    <img src={instagram} alt="" />
                  </a>
                  <a href="#">
                    <img src={gmail} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Minting;

const Space = styled.div`
  height: 200px;
  @media (max-width: 992px) {
    height: 140px;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 992px) {
    font-size: 30px;
  }
`;
const OnlineStatus = styled.p`
  font-size: 16px;
  color: #1e2a37;
  font-weight: 400;
  position: relative;
  padding-left: 16px;
  @media (max-width: 992px) {
    font-size: 12px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #13da6e;
  }
`;
const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #fd576c;
  @media (max-width: 992px) {
    font-size: 12px;
  }
`;
const Status = styled.h2`
  font-size: 36px;
  font-weight: 700;
  line-height: 62px;
  @media (max-width: 992px) {
    font-size: 24px;
    line-height: 36px;
  }
`;
