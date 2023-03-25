import React from "react";
import router from "next/router";
import Layout from "components/Layout";
import ThankyouPage from "components/ThankyouPage";

type Props = {};

const Thankyou: React.FC<Props> = () => {
  const handleRedirect = () => router.push(`/new`);

  return (
    <Layout headerIsTransparent>
      <ThankyouPage />
    </Layout>
  );
};

export default Thankyou;
