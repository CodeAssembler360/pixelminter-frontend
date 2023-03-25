import React from "react";
import Layout from "components/Layout";
import IndexPage from "components/IndexPage";
import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import styled from "styled-components";

type Props = {};

const Index: React.FC<Props> = () => {
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
            position: "absolute",
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
          <IndexSkeleton>
            <Stack
              alignSelf="center"
              flexDirection="column"
              alignItems={{ lg: "baseline", xs: "center" }}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Skeleton
                animation="wave"
                variant="text"
                height={100}
                width="90%"
              />
              {mediaQuery && (
                <Skeleton animation="wave" height={100} width="50%" />
              )}
              <Skeleton animation="wave" height={30} width="60%" />
            </Stack>
            <Stack
              flexDirection="column"
              alignItems={{ lg: "self-end", xs: "center" }}
              gap="10px"
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                flexDirection="column"
                alignItems="center"
                width="330px"
                p="20px"
                borderRadius="20px"
                sx={{
                  border: "1px solid #dcdbdb",
                }}
              >
                {mediaQuery ? (
                  <Skeleton
                    sx={{ height: 390 }}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                  />
                ) : (
                  <Skeleton
                    sx={{ height: 290, marginTop: " 20px" }}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                  />
                )}
                <Skeleton animation="wave" height={30} width="80%" />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ borderRadius: "50px" }}
                  height={50}
                  width="50%"
                />
              </Stack>
            </Stack>
          </IndexSkeleton>
        </div>
      )}
      <Box display={loading ? "none" : "block"}>
        <Layout headerIsTransparent>
          <IndexPage />
        </Layout>
      </Box>
    </React.Fragment>
  );
};

export default Index;

const IndexSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-top: 90px;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    padding-top: 40px;
  }
`;
const NavbarSkeleton = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
`;
