import React from "react";
import styled from "styled-components";
import { Container } from "components/elements";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";

type Props = {};

const ProfilePage: React.FC<Props> = () => {
  const { address, chainId, disconnectWallet } = useWeb3();

  return (
    <>
      <Container>
        <>
          Address: {address}
          <br />
          Chain ID: {chainId}
          <br />
          {/* <button onClick={() => switchNetwork(1)}>Switch to Mainnet</button>
          <button onClick={() => switchNetwork(4)}>Switch to Rinkeby</button> */}
          {/* <button onClick={disconnectWallet}>Disconnect</button> */}
        </>
      </Container>
    </>
  );
};

export default ProfilePage;
