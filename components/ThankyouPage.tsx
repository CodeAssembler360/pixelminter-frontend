import React from "react";
import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";
import firebase from "firebase/firebaseClient";


import trustIcon from "assets/svg/icons/trust.svg";
import coinbaseIcon from "assets/svg/icons/coinbase.svg";
import mobileIcon from "assets/svg/icons/mobile.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import {Modal, Button, Container, Row, Col, InputGroup, FormControl, Accordion} from "react-bootstrap";
import thankyouIcon from "../assets/svg/thankyou-icon.svg";
import logo from "../assets/svg/logo.svg";
import heroImage from './../assets/svg/wallet.svg';
import joinImage from './../assets/svg/welcome.svg';

function SuccessModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ModalIcon src={thankyouIcon} alt=""/>
                <ModalTitle>Thank You!</ModalTitle>
                <ModalText>Your submission has been received.</ModalText>
            </Modal.Body>
        </Modal>
    );
}

const ThankyouPage = () => {
    const [modalShow, setModalShow] = React.useState(false);
  return (
      <>
          <SuccessModal
              show={modalShow}
              onHide={() => setModalShow(false)}
          />
          <Hero>
              <Container>
                  <Row className="d-flex align-items-center">
                      <Col lg={7}>
                          <HeroTitle>NFT Generator And Minting Tool In One</HeroTitle>
                          <HeroDesc>
                              Join the waitlist for early access to the Pixel Minter
                          </HeroDesc>
                          <InputGroup className="input-group-rounded my-5">
                              <FormControl
                                  placeholder="Enter Your Email Address"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                              />
                              <Button>Join The Waiting List</Button>
                          </InputGroup>
                      </Col>
                      <Col lg={5}>
                         <img src={heroImage} />
                      </Col>
                  </Row>
              </Container>
          </Hero>
          <JoinSection>
              <Container>
                  <Row className="d-flex align-items-center">
                      <Col lg={6}>
                          <img src={joinImage} />
                      </Col>
                      <Col lg={6}>
                          <SecTitle>Who we are</SecTitle>
                          <Title>What Is Pixel Minter?</Title>
                          <JoinDesc>
                              Pixel Minter is the most user-friendly NFT collection creation and minting tool in the marketplace today. It allows users to generate
                              massive NFT collections easily without coding and it also allows NFT creators to make NFTs via “lazy minting”.
                          </JoinDesc>
                          <JoinDesc>
                              Pixel Minter is the most user-friendly NFT collection creation and minting tool in the marketplace today. It allows users to generate
                              massive NFT collections easily without coding and it also allows NFT creators to make NFTs via “lazy minting”.
                          </JoinDesc>
                            <Button className="mt-4 rounded-pill">Join Us Now</Button>
                      </Col>
                  </Row>
              </Container>
          </JoinSection>
          <FaqSection>
              <Container>
                  <Row>
                      <Col lg={{span: 10, offset: 1}}>
                          <div className="text-center mb-5">
                              <SecTitle>FAQs</SecTitle>
                              <Title>Frequently Asked Questions</Title>
                          </div>
                          <Accordion defaultActiveKey="0">
                              <Accordion.Item eventKey="0">
                                  <Accordion.Header>Who is eligible to join the waitlist?</Accordion.Header>
                                  <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                      veniam, quis nostrud exercitation ullamco laboris nisi ut al.
                                  </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="1">
                                  <Accordion.Header>When can I join Pixel Minter?</Accordion.Header>
                                  <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                      veniam, quis nostrud exercitation ullamco laboris nisi ut al.
                                  </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="2">
                                  <Accordion.Header>Why should I join the email waitlist?</Accordion.Header>
                                  <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                      veniam, quis nostrud exercitation ullamco laboris nisi ut al.
                                  </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="3">
                                  <Accordion.Header>What determines my position on the waitlist?</Accordion.Header>
                                  <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                      veniam, quis nostrud exercitation ullamco laboris nisi ut al.
                                  </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="4">
                                  <Accordion.Header>When will I be let off the waitlist?</Accordion.Header>
                                  <Accordion.Body>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                      veniam, quis nostrud exercitation ullamco laboris nisi ut al.
                                  </Accordion.Body>
                              </Accordion.Item>
                          </Accordion>
                      </Col>
                  </Row>
              </Container>
          </FaqSection>
          <Footer>
              <Container>
                  <FooterBanner>
                      <FooterTitle>Create The Next Character NFT</FooterTitle>
                      <Button className="rounded-pill">Join Us Now</Button>
                  </FooterBanner>
              </Container>
              <FooterBottom>
                  <Container>
                      <FooterBottomInner>
                          <FooterLogo src={logo} />
                          <FooterCopyright>
                              © 2022 <b>Pixel True NFT</b>. All Rights Reserved
                          </FooterCopyright>
                      </FooterBottomInner>
                  </Container>
              </FooterBottom>
          </Footer>
      </>
  );
};


export default ThankyouPage;


const Hero = styled.div`
  display: flex;
  align-items: center;
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
  color: #fff;
  padding: 100px 0;
  height: 1000px;
  @media (max-width: 1400px) {
     height: 800px;
  }
  @media (max-width: 1200px) {
     height: 700px;
  }
  @media (max-width: 992px) {
     height: auto;
     text-align: center;
     padding: 140px 0 60px;
  }
`;
const HeroTitle = styled.h1`
  font-size: 70px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
  @media (max-width: 1400px) {
     font-size: 50px;
  }
  @media (max-width: 1200px) {
     font-size: 30px;
  }
  @media (max-width: 992px) {
     margin-bottom: 0;
  }
`;
const HeroDesc = styled.p`
  color: #dcdbdb;
  font-size: 20px;
  @media (max-width: 992px) {
     font-size: 16px;
  }
`;

const JoinSection = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 120px 0;
  background-color: #fff;
  @media (max-width: 1400px) {
     padding: 90px 0;
  }
  @media (max-width: 992px) {
     text-align: center;
     padding: 60px 0;
  }
`;
const JoinDesc = styled.p`
  color: #7377A9;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 20px;
  @media (max-width: 992px) {
     font-size: 16px;
  }
`;

const FaqSection = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 120px 0;
  background-color: #ECF2FD;
  @media (max-width: 1400px) {
     padding: 90px 0;
  }
  @media (max-width: 992px) {
     text-align: center;
     padding: 60px 0;
  }
`;

const Title = styled.h1`
    color: #000;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
  @media (max-width: 1400px) {
     font-size: 36px;
  }
  @media (max-width: 1200px) {
     font-size: 30px;
  }
`;
const SecTitle = styled.h6`
    color: #FD576C;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.4;
  margin-bottom: 10px;
  letter-spacing: 3px;
`;

const Footer = styled.div`
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 40%,
    #1e2251 81%
  );
  color: #ffffff;
`;
const FooterTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 34px;
  @media (max-width: 992px) {
    margin-bottom: 25px;
    font-size: 24px;
  }
`;
const FooterBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 75px;
  padding-bottom: 80px;
`;
const FooterBottom = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;
const FooterBottomInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 992px) {
    display: block;
    text-align: center;
  }
`;
const FooterLogo = styled.img`
  display: block;
  width: 150px;
  @media (max-width: 992px) {
    margin: 0 auto 20px;
  }
`;
const FooterCopyright = styled.div`
  color: #dcdbdb;

  b {
    color: #ffffff;
  }
`;

// Modal
const ModalIcon = styled.img`
  margin: 0 auto 20px;
`;
const ModalTitle = styled.h1`
  color: #FD576C;
  font-size: 50px;
  font-weight: bold;
`;
const ModalText = styled.h1`
  color: #6D6D72;
  font-size: 16px;
`;