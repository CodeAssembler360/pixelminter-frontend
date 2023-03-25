import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import PrintObject from "../components/PrintObject";
import { Container } from "components/elements";
import ClearCart from "../components/ClearCart";

import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  const downloadURL = router.query.file;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadURL;
    a.download = "archive.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  React.useEffect(() => {
    if (data?.payment_intent?.status === "succeeded") {
      console.log("got the link", downloadURL);
      handleDownload();
    }
  }, [data]);

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <Container>
        <br />
        <br />
        <br />
        <br />

        {data?.payment_intent?.status === "succeeded" && (
          <button onClick={handleDownload}>download</button>
        )}

        {/* <br />
        <br />
        <br />
        <br /> */}
        <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? "loading..."} />
      </Container>
    </Layout>
  );
};

export default ResultPage;
