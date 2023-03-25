import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import { Container } from "components/elements";
import Guide from "components/GuidePage";
import Footer from "components/Footer";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";

type Props = {};

const GuidePage: React.FC<Props> = () => {
  const [loading, setLoading] = React.useState(true);
  const mediaQuery = useMediaQuery("(min-width:1000px)");

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
            position: "absolute",
            zIndex: "9999",
            background: "#fff",
            height: "100vh",
            width: "100%",
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
                <Skeleton animation="wave" height={70} width="10%" />
                <Skeleton animation="wave" height={70} width="10%" />
                <Skeleton
                  animation="wave"
                  sx={{ borderRadius: "50px" }}
                  variant="rounded"
                  height={50}
                  width="15%"
                />
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
            sx={{ height: "80vh" }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        </div>
      )}
      <Box display={loading ? "none" : "block"}>
        <Layout headerIsTransparent backgroundColor>
          <>
            <Guide />
            <Footer />
          </>
        </Layout>
      </Box>
    </React.Fragment>
  );
};

export default GuidePage;

const NavbarSkeleton = styled.div`
  padding-top: 20px !important;
  display: flex !important;
  gap: 20px !important;
  justify-content: space-between !important;
  flex-direction: row !important;
  width: 80% !important;
  margin: 0 auto !important;
`;
