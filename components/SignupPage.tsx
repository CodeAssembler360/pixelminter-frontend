import React from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";

import metamaskIcon from "../assets/svg/icons/metamask.svg";
import coinbaseIcon from "../assets/svg/icons/coinbase.svg";
import mobileIcon from "../assets/svg/icons/mobile.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import successIcon from "assets/svg/success-icon.svg";

type Props = {
  onFetchUserComplete: any;
};

type ConnectorOptions = "magic" | "walletconnect" | "walletlink" | "injected";

const providers = [
  {
    title: "Metamask Wallet",
    icon: metamaskIcon,
    method: "injected" as ConnectorOptions,
  },
  {
    title: "Coinbase Wallet",
    icon: coinbaseIcon,
    method: "walletlink" as ConnectorOptions,
  },
  {
    title: "Mobile Wallet",
    icon: mobileIcon,
    method: "walletconnect" as ConnectorOptions,
  },
];

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
        <ModalIcon src={successIcon} alt="" />
        <ModalTitle>Success!</ModalTitle>
        <ModalText>You have created an account successfully.</ModalText>
        <Button className="rounded-pill mt-4 btn-lg">Login Now</Button>
      </Modal.Body>
    </Modal>
  );
}

const SignupPage: React.FC<Props> = ({ onFetchUserComplete }) => {
  let subtitle;
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Root>
      <Paper>
        <SuccessModal show={modalShow} onHide={() => setModalShow(false)} />
        <Content>
          <Title>Sign Up</Title>
          <Text>Choose Preferred Wallet</Text>
          <Buttons>
            {providers.map(
              (provider) =>
                provider.method && (
                  <Button1
                    key={provider.title}
                    onClick={() => setModalShow(true)}
                  >
                    <ButtonStartIcon src={provider.icon} />
                    {provider.title}
                    <ButtonEndIcon>
                      <ArrowRight src={arrowRight} />
                    </ButtonEndIcon>
                  </Button1>
                )
            )}
          </Buttons>
        </Content>
      </Paper>
    </Root>
  );
};

export default SignupPage;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 500px;
  padding: 150px 20px;
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
`;
const Paper = styled.div`
  min-width: 580px;
  height: 380px;
  margin-top: 50px;
  background: #ffffff;
  border: 1px solid #eaecee;
  border-radius: 10px;
  text-align: center;
  @media (max-width: 992px) {
    height: auto;
    min-width: auto;
    width: 100%;
    max-width: 580px;
  }
`;
const Content = styled.div`
  padding: 45px 70px 0;
  @media (max-width: 992px) {
    padding: 45px 40px;
  }
`;
const Title = styled.h1`
  color: #0f123d;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
`;
const Text = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;
const Buttons = styled.div`
  margin-bottom: 34px;
`;
const Button1 = styled.button`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 50px 10px 70px;
  background: #ffffff;
  border: 1px solid #eaecee;
  border-radius: 4px;
  color: #0f123d;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  box-shadow: none;
  outline: none;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover,
  &:focus {
    background: #00000010;
  }
`;
const ButtonEndIcon = styled.div`
  position: absolute;
  display: block;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 7px;
`;
const ButtonStartIcon = styled.img`
  position: absolute;
  display: block;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 26px;
`;
const ArrowRight = styled.img``;

// Modal
const ModalIcon = styled.img`
  margin: 0 auto 20px;
`;
const ModalTitle = styled.h1`
  color: #fd576c;
  font-size: 50px;
  font-weight: bold;
`;
const ModalText = styled.h1`
  color: #6d6d72;
  font-size: 16px;
`;

const Formgroup = styled.div`
  margin-bottom: 20px;
  position: relative;
  @media (max-width: 1600px) {
    margin-bottom: 10px;
  }
`;
const LabelArea = styled.div`
  position: relative;
  color: #a9a9b5;
  font-size: 18px;
  padding-left: 30px;
  margin-bottom: 10px;
  @media (max-width: 1600px) {
    font-size: 16px;
    padding-left: 25px;
  }
`;
const LabelAreaIcon = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  @media (max-width: 1600px) {
    max-width: 16px;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #a9a9b5;
  border-radius: 5px;
  display: block;
  width: 100%;
  font-size: 20px;
  padding: 12px 16px;
  &:hover,
  &:focus {
    border-color: #fd576c;
    box-shadow: 0 2px 8px rgba(253, 87, 107, 0.3);
  }
  @media (max-width: 1600px) {
    padding: 8px 16px;
    font-size: 16px;
  }
`;
const InputButton = styled.button`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

const Spacer20 = styled.div`
  height: 20px;
`;
const Spacer30 = styled.div`
  height: 30px;
`;
