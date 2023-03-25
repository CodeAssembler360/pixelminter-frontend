import React from "react";
import router from "next/router";
import Layout from "components/Layout";
import SignupPage from "components/SignupPage";

type Props = {};

const Signup: React.FC<Props> = () => {
  const handleRedirect = () => router.push(`/new`);

  return (
    <Layout headerIsTransparent>
      <SignupPage onFetchUserComplete={handleRedirect} />
    </Layout>
  );
};

export default Signup;
