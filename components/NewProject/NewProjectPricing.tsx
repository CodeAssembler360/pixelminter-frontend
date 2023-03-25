import React from "react";
import styled from "styled-components";
// import { Button, ContainerSM } from "components/elements";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

import pricing1image from "assets/svg/pricing-1.svg";
import pricing2image from "assets/svg/pricing-2.svg";
import pricing3image from "assets/svg/pricing-3.svg";

import check from "assets/svg/check.svg";

const plans = [
  {
    title: "Free",
    image: pricing1image,
    text: `Create collections up to 100 unique NFT's completely for free and download the collection so you can mint them on any marketplace you like`,
    list: [
      "Generate up to 100 NFT artwork for FREE",
      "Download the ZIP file instantly",
    ],
    type: "free",
  },
  {
    title: "Pay Up-Front",
    image: pricing2image,
    text: `When you know your collection is going to be a hit, pay for the creation up front at $0.10 per illustration`,
    list: [
      "Generate up to 10,000 NFT Artwork",
      "Pay $0.10 per generated artwork",
      "Download ZIP file instantly",
    ],
    featured: true,
    type: "upfront",
  },
  {
    title: "Minting fee",
    image: pricing3image,
    text: `When you know your collection is going to be a hit, pay for the creation up front at $0.05 per illustration`,

    list: [
      "Generate up to 10,000 NFT Artwork",
      "Choose your minting strategy",
      "Pay $0.05 per generated artwork",
      "Original NFT",
    ],
    type: "minting-fee",
  },
];

type Props = {
  onSelect: any;
};

const NewProjectPricing: React.FC<Props> = ({ onSelect }) => {
  return (
    <Root>
      <Inner>
        <Container>
          <Title>Our Pricing</Title>
          <Plans>
            <Row>
              {plans.map((plan) => (
                <Col key={plan.title} lg={4}>
                  <Plan featured={plan.featured} className="h-100">
                    <PlanImage src={plan.image} />
                    <PlanTitle light={plan.featured}>{plan.title}</PlanTitle>
                    {/*<PlanText light={plan.featured}>{plan.text}</PlanText>*/}
                    <ul className="list-unstyled text-start list-s2 mb-5">
                      {plan.list.map((item) => (
                        <li
                          className={plan.featured ? "text-light" : ""}
                          key={item}
                        >
                          <img className="icon" src={check} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {plan.featured && (
                      <PlanRecommendedBadge>Recommended</PlanRecommendedBadge>
                    )}
                    <PlanBottom>
                      <Button
                        className="rounded-pill my-4"
                        onClick={() => onSelect(plan.type)}
                      >
                        Select
                      </Button>
                    </PlanBottom>
                  </Plan>
                </Col>
              ))}
            </Row>
          </Plans>
        </Container>
      </Inner>
    </Root>
  );
};

export default NewProjectPricing;

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f123d90;
  z-index: 9999;
  overflow: auto;
  @media (max-width: 992px) {
    padding: 40px 20px;
    align-items: start;
    justify-content: center;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding-bottom: 42px;
  color: #0f123d;
`;

const Inner = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 42px 42px;
`;

const Plans = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Plan = styled.div<{ featured?: boolean }>`
  position: relative;
  margin-bottom: 20px;
  border: 1px solid #eaecee;
  border-radius: 12px;
  text-align: center;
  padding: 250px 20px 40px 20px;
  background: ${({ featured }) => (featured ? "#0F123D" : "#ffffff")};
  overflow: hidden;
  &:last-child,
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover img {
    transform: translate(-50%, 0) scale(1);
  }
  @media (max-width: 1200px) {
    padding: 220px 20px 40px 20px;
  }
  @media (max-width: 992px) {
    height: auto !important;
  }
`;

const PlanImage = styled.img`
  display: block;
  width: auto;
  height: 200px;
  margin: 0 auto;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0) scale(0.8);
  transition: 0.2s;
  @media (max-width: 1200px) {
    top: 20px;
  }
`;

const PlanTitle = styled.div<{ light?: boolean }>`
  color: ${({ light }) => (light ? "#ffffff" : "#0e234b")};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  @media (max-width: 1200px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const PlanText = styled.div<{ light?: boolean }>`
  color: ${({ light }) => (light ? "#DCDBDB" : "#7377a9")};
  font-size: 18px;
  line-height: 1.4;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;
const PlanBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

const PlanRecommendedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 290px;
  height: 40px;
  transform: rotate(32deg) translateY(-92px) translateX(75px);
  transform-origin: 0 0;
  color: #ffdbdf;
  background: #fd576c;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
`;
