import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Container } from "react-bootstrap";
import logo from "assets/svg/logo.svg";
import { UserContext } from "context/UserContext";


function Footer() {
  const { user } = useContext(UserContext);
  return (
    <Root>
      <Container>
        <Banner>
          <Title>Create The Next Character NFT</Title>
           {user != "undefined" && user ? (
              <Button href="/new" className="rounded-pill">
                Join Us Now
              </Button>
            ) : (
              <Button href="/login" className="rounded-pill">
                Join Us Now
              </Button>
            )}
        </Banner>
      </Container>
      <FooterBottom>
        <Container>
          <Inner>
            <Logo src={logo} />
            <FooterCopyright>
              © 2023 <b>Pixel True NFT</b>. All Rights Reserved
            </FooterCopyright>
          </Inner>
        </Container>
      </FooterBottom>
    </Root>
  );
}

export default Footer;

const Root = styled.div`
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 40%,
    #1e2251 81%
  );
  color: #ffffff;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 34px;

  @media (max-width: 992px) {
    margin-bottom: 25px;
    font-size: 24px;
  }
`;

const Banner = styled.div`
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

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    display: block;
    text-align: center;
  }
`;

const Logo = styled.img`
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
