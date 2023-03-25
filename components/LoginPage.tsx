import React from "react";
import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";
import firebase from "firebase/firebaseClient";

import metamaskIcon from "assets/svg/icons/metamask.svg";
import trustIcon from "assets/svg/icons/trust.svg";
import coinbaseIcon from "assets/svg/icons/coinbase.svg";
import mobileIcon from "assets/svg/icons/mobile.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import { Modal, Button } from "react-bootstrap";
import successIcon from "../assets/svg/success-icon.svg";

type ConnectorOptions = "magic" | "walletconnect" | "walletlink" | "injected";

const providers = [
  {
    title: "Connect Metamask Wallet",
    icon: metamaskIcon,
    method: "injected" as ConnectorOptions,
  },
  {
    title: "Connect Trust Wallet",
    icon: trustIcon as ConnectorOptions,
  },
  {
    title: "Connect Coinbase Wallet",
    icon: coinbaseIcon,
    method: "walletlink" as ConnectorOptions,
  },
  {
    title: "WalletConnect",
    icon: mobileIcon,
    method: "walletconnect" as ConnectorOptions,
  },
];

type Props = {
  onFetchUserComplete: any;
};

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

const LoginPage: React.FC<Props> = ({ onFetchUserComplete }) => {
  const [user, setUser] = React.useState(null);
  const { address, connectWallet } = useWeb3();
  const [modalShow, setModalShow] = React.useState(false);

  const handleConnect = (provider) => {
    connectWallet(provider);
  };

  const fetchUser = async () => {
    const dataRef = await firebase.firestore().collection("users").doc(address);
    const data = await dataRef.get();

    if (data.exists) {
      return data.data();
    } else {
      const newUserData = {
        wallet: address,
        projects: [],
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(address)
        .set(newUserData);

      return newUserData;
    }
  };

  React.useEffect(() => {
    address && fetchUser().then((u) => setUser(u));
  }, [address]);

  React.useEffect(() => {
    user && user.wallet && onFetchUserComplete();
  }, [user]);

  if (address) {
    return (
      <Root>
        <Paper className="d-flex align-items-center justify-content-center">
          <Content>
            <Titleh4>Connecting</Titleh4>
          </Content>
        </Paper>
      </Root>
    );
  }

  return (
    <Root>
      <Paper>
        <SuccessModal show={modalShow} onHide={() => setModalShow(false)} />
        <Content>
          <Title>Connect Wallet</Title>
          <Buttons>
            {providers.map(
              (provider) =>
                provider.method && (
                  <Button1
                    key={provider.title}
                    onClick={() => handleConnect(provider.method)}
                    // onClick={() => setModalShow(true)}
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
        <Footer>
          Don't have a wallet?
          <a href="/signup">Create Wallet Here</a>
        </Footer>
      </Paper>
    </Root>
  );
};

export default LoginPage;

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
const Footer = styled.div`
  padding: 20px 78px 0;
  border-top: 1px solid #eaecee;
  font-size: 16px;
  color: #7377a9;
  a {
    display: inline-block;
    margin-left: 4px;
    color: #fd576c;
    font-weight: 700;
  }
  @media (max-width: 992px) {
    padding: 20px;
  }
`;
const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
`;
const Titleh4 = styled.h1`
  margin-bottom: 0;
  font-size: 20px;
  font-weight: 700;
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
