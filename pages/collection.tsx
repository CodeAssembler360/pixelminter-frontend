import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import CollectionPage from "components/CollectionPage";
import { Container } from "components/elements";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";

type Props = {};

const Collection_Page: React.FC<Props> = () => {
  const mediaQuery = useMediaQuery("(min-width:1000px)");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <React.Fragment>
      {loading && (
        <div
          style={{
            overflow: "hidden",
            position: "absolute",
            overflowY: "hidden",
            zIndex: "9999",
            background: "#fff",
            height: "100vh",
            width: "100vw",
          }}
        >
          <NavbarSkeleton>
            <Skeleton animation="wave" height={70} width="260px" />
            {mediaQuery ? (
              <Stack
                flexDirection="row"
                gap="10px"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <Skeleton animation="wave" height={70} width="15%" />
                <Skeleton animation="wave" height={70} width="10%" />
                <Skeleton animation="wave" height={70} width="10%" />
                <Skeleton animation="wave" height={70} width="10%" />
              </Stack>
            ) : (
              <Stack
                flexDirection="row"
                gap="10px"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <Skeleton animation="wave" height={70} width="50px" />
              </Stack>
            )}
          </NavbarSkeleton>
          <Stack
            flexDirection="row"
            py="90px"
            sx={{ width: "100%" }}
            justifyContent="center"
          >
            <Skeleton animation="wave" height={70} width="350px" />
          </Stack>
          <Stack
            sx={{ height: "20vh" }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        </div>
      )}
      <Box display={loading ? "none" : "block"}>
        <Layout headerIsTransparent>
          <CollectionPage setLoading={setLoading} />
        </Layout>
      </Box>
    </React.Fragment>
  );
};

export default Collection_Page;
const NavbarSkeleton = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
`;
