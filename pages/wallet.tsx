import React, { useEffect } from "react";
import styled from "styled-components";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import metamaskIcon from "assets/svg/icons/metamask.svg";
import trustIcon from "assets/svg/icons/trust.svg";
import coinbaseIcon from "assets/svg/icons/coinbase.svg";
import mobileIcon from "assets/svg/icons/mobile.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import { Modal, Button } from "react-bootstrap";
import successIcon from "../assets/svg/success-icon.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { walletRequest } from "../app/WalletSlice";
import { useRouter } from "next/router";
import Web3 from "web3";
import { ethers } from "ethers";

function wallet() {
  const router = useRouter();
  const dispatch = useDispatch();
  const wallets = useSelector((state: any) => state.wallets);
  const { wallet } = wallets;
  const { active, chainId, account } = useWeb3React();
  const { activate, deactivate } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://rinkeby.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://rinkeby.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const checkFunction = async () => {
    const provider = await Injected.activate();
    const web3 = new Web3(provider.provider);
    var message = "Some string";
    var hash = web3.utils.sha3(message);
    // var account = await web3.eth.accounts[0];
    const account = await web3.eth.getAccounts();
    const signer = await web3.eth.sign(hash, account[0]);
    console.log("sign", signer);
  };

  const paymentFunction = async () => {
    const provider = await Injected.activate();
    const web3 = new Web3(provider.provider);
    const account = await web3.eth.getAccounts();
    const transaction = await web3.eth.sendTransaction({
      from: account[0],
      value: web3.utils.toWei("1"),
      to: "0xF32F7C03a4D530935F5332CA5DC4a971149dda2E",
    });
    console.log(transaction, "tran");
  };
  const providers = [
    {
      title: "Connect Metamask Wallet",
      icon: metamaskIcon,
      method: Injected,
    },
    {
      title: "Connect Coinbase Wallet",
      icon: coinbaseIcon,
      method: CoinbaseWallet,
    },
    {
      title: "WalletConnect",
      icon: mobileIcon,
      method: WalletConnect,
    },
  ];
  const handleConnect = (item) => {
    activate(item.method);
    sessionStorage.setItem("item", item.title);

    console.log("connect", item);
  };

  console.log(
    "active : ",
    active,
    "chainID : ",
    chainId,
    "Account : ",
    account
  );
  return (
    <Root>
      <Paper>
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
          <div onClick={checkFunction}>Check</div>
        </Content>
      </Paper>
    </Root>
  );
}

export default wallet;
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
