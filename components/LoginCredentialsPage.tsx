import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  ModalHeader,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { UserContext } from "context/UserContext";

import userIcon from "assets/svg/user-icon.svg";
import lockIcon from "assets/svg/lock-icon.svg";
import eyeIcon from "assets/svg/eye-icon.svg";
import eyeCloseIcon from "assets/svg/eye-off-icon.svg";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import metamaskIcon from "assets/svg/icons/metamask.svg";
import trustIcon from "assets/svg/icons/trust.svg";
import coinbaseIcon from "assets/svg/icons/coinbase.svg";
import mobileIcon from "assets/svg/icons/mobile.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import successIcon from "../assets/svg/success-icon.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { walletRequest } from "../app/WalletSlice";
import { useRouter } from "next/router";
import Web3 from "web3";
import { ethers } from "ethers";
const apiURL = "https://minter.pixeltrue.com/api";

const axiosConfig = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
};

type Props = {
  onFetchUserComplete?: any;
};

const initialValues = {
  email: "",
  password: "1234567A",
};

const LoginPage: React.FC<Props> = ({ onFetchUserComplete }) => {
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState(initialValues);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState();
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const wallets = useSelector((state: any) => state.wallets);
  const { wallet } = wallets;
  const { active, chainId, account } = useWeb3React();
  const { activate, deactivate } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://rinkeby.infura.io/v3/d5c5b1a8b44b4efc8fc8fa2f37af0fb1`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://rinkeby.infura.io/v3/d5c5b1a8b44b4efc8fc8fa2f37af0fb1`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const checkFunction = async (item, title) => {
    if (window.ethereum) {
      const provider = await item.activate();
      const web3 = new Web3(provider.provider);
      var message = "Some string";
      var hash = web3.utils.sha3(message);
      // var account = await web3.eth.accounts[0];
      const account = await web3.eth.getAccounts();
      console.log("hello", account);
      sessionStorage.setItem("wallet", account);
      const signer = await web3.eth.sign(
        hash,
        account[0],
        (error, signature) => {
          if (error) {
            console.log(error, "what");
          } else {
            console.log(signature, "Sign");
          }
        }
      );
      console.log("sign", signer);
      login(signer);
      // Do something
    } else {
      setModal(true);
    }
    // console.log("here", providers);

    // const signature = await signer.signMessage(Message);
    // web3.eth.accounts.signTransaction(
    //    message,
    //   account,
    //   function (error, signature) {
    //     console.log(signature, error, "signature");
    //   }
    // );
  };

  const providers = [
    {
      title: "Connect Metamask Wallet",
      icon: metamaskIcon,
      method: Injected,
      description: "Download Metamask Wallet",
      link: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
    },
    {
      title: "Connect Coinbase Wallet",
      icon: coinbaseIcon,
      method: CoinbaseWallet,
      description: "Download Coinbase Wallet",
      link: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en",
    },
    {
      title: "WalletConnect",
      icon: mobileIcon,
      method: WalletConnect,
      description: "Download WalletConnect Wallet",
      link: "https://chrome-stats.com/d/djmlnjfkgolclllleomgpgodjkmnjoec",
    },
  ];
  const handleConnect = (item) => {
    activate(item.method);
    sessionStorage.setItem("item", item.title);
    checkFunction(item.method, item.title);
  };

  console.log(
    "active : ",
    active,
    "chainID : ",
    chainId,
    "Account : ",
    account
  );

  const { saveUser } = useContext(UserContext);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof account !== "undefined") {
        sessionStorage.setItem("wallet", account);
        // saveUser(token);
        console.log("hello", account);
      }
    }
  }, [token]);

  React.useEffect(() => {
    if (token && typeof token === "string") {
      if (typeof window !== "undefined") {
        saveUser(token);
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((x) => ({ ...x, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // login();
  };

  const login = async (item: any) => {
    await axios
      .post(`${apiURL}/wallet/login`, { signature: item })
      .then((response) => {
        if (response.status === 200) {
          // sessionStorage.setItem("wallet", account);
          setToken(response.data.data.token);
          setLoading(false);
          router.push("/");
        }
        // if (response.status === 200) {
        //   setToken(response.data.data.token);
        //   setLoading(false);
        // }
        console.log(response, "response");
      })
      .catch((err) => {
        console.log(err, "err");

        signUp(item);
        // } else {
        //   setError(err.response.data.msg);
        //   setLoading(false);
        // }
      });
  };

  const signUp = async (item: any) => {
    await axios
      .post(`${apiURL}/wallet/signup`, { signature: item })
      .then((response) => {
        console.log(response, "response");
        login(item);
      })
      .catch((err) => {
        console.log(err, "err");

        // setError(err.response.data.msg);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  return (
    <Root>
      <Paper>
        {/* <SuccessModal
          show={modalShow}
          onHide={() => setModalShow(false)}
      /> */}
        <Content>
          <Title>Connect Wallet</Title>
          <Buttons>
            {providers.map(
              (provider) =>
                provider.method && (
                  <Button1
                    key={provider.title}
                    onClick={() => handleConnect(provider)}
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
          {/* <div onClick={checkFunction}>Check</div> */}
        </Content>
      </Paper>
      {modal && (
        <Modal show={modal} centered onHide={() => setModal(false)}>
          <ModalHeader closeButton />
          <Title className="text-center">Download Wallet</Title>
          <Buttons>
            {providers.map(
              (provider) =>
                provider.method && (
                  <Href1
                    key={provider.title}
                    target="_blank"
                    href={provider.link}
                    // onClick={() => setModalShow(true)}
                  >
                    <ButtonStartIcon src={provider.icon} />
                    {provider.description}
                    <ButtonEndIcon>
                      <ArrowRight src={arrowRight} />
                    </ButtonEndIcon>
                  </Href1>
                )
            )}
          </Buttons>
        </Modal>
      )}
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
const Href1 = styled.a`
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
