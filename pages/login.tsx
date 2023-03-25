import React, { useContext } from "react";
import router from "next/router";
import Layout from "components/Layout";
import LoginCredentialsPage from "components/LoginCredentialsPage";
import { UserContext } from "context/UserContext";
import { Box, Skeleton, Stack, useMediaQuery } from "@mui/material";
import styled from "styled-components";

type Props = {};

const Login: React.FC<Props> = () => {
  const mediaQuery = useMediaQuery("(min-width:1000px)");

  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (user && user.token) router.push(`/new`);
  }, [user]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          <LoginSkeleton>
            <Skeleton
              sx={{ alignSelf: "center" }}
              animation="wave"
              height={70}
              width="260px"
            />
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton animation="wave" height={70} width="50px" />
              <Skeleton animation="wave" height={70} width="200px" />
              <Skeleton animation="wave" height={70} width="50px" />
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton animation="wave" height={70} width="50px" />
              <Skeleton animation="wave" height={70} width="200px" />
              <Skeleton animation="wave" height={70} width="50px" />
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton animation="wave" height={70} width="50px" />
              <Skeleton animation="wave" height={70} width="200px" />
              <Skeleton animation="wave" height={70} width="50px" />
            </Stack>
          </LoginSkeleton>
        </div>
      )}
      <Box display={loading ? "none" : "block"}>
        <Layout headerIsTransparent>
          <LoginCredentialsPage />
        </Layout>
      </Box>
    </React.Fragment>
  );
};

export default Login;
const NavbarSkeleton = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
`;
const LoginSkeleton = styled.div`
  margin-top: 150px !important;
  max-width: 500px;
  min-width: 320px;
  margin: 0px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdbdb;
  border-radius: 30px;
`;
