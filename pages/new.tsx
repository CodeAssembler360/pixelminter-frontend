import React, { useContext } from "react";
import router from "next/router";
import styled from "styled-components";
import Layout from "components/Layout";
import NewProject from "components/NewProject";
import NewProjectWaiting from "components/NewProject/NewProjectWaiting";
import NewProjectPreview from "components/NewProject/NewProjectPreview";
import NewProjectPricing from "components/NewProject/NewProjectPricing";
import NewProjectPayment from "components/NewProject/NewProjectPayment";
import CheckoutForm from "components/CheckoutForm";
import PageHeader from "components/PageHeader";
import { useWeb3 } from "@3rdweb/hooks";
import create from "utils/generatorBuildIn";
import save from "utils/generatorSave";

import CustomDonationInput from "../components/CustomDonationInput";
import StripeTestCards from "../components/StripeTestCards";

import getStripe from "../utils/get-stripejs";
import { fetchPostJSON } from "../utils/api-helpers";
import { formatAmountForDisplay } from "../utils/stripe-helpers";
import * as config from "../config";
import { Button, Modal } from "react-bootstrap";
import giftIcon from "../assets/svg/gift-icon.svg";

import { UserContext } from "context/UserContext";

type Props = {};

function SuccessModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <ModalIcon src={giftIcon} alt="" />
        <ModalTitle className="mb-3">Download Success!</ModalTitle>
        <ModalText>
          You have download your file successfully. <br />
          View your collections now?
        </ModalText>
        <Button href="/" className="rounded-pill mt-4">
          View your Collection
        </Button>
      </Modal.Body>
    </Modal>
  );
}
const Index: React.FC<Props> = () => {
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (!user || (user && !user.token)) router.push(`/login`);
  }, [user]);

  const [loading, setLoading] = React.useState(false);
  const { address } = useWeb3();
  const [generated, setGenerated] = React.useState(null);
  const [step, setStep] = React.useState(1);
  const [plan, setPlan] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const [tmp, setTmp] = React.useState({ items: [], layers: [] });

  const handleGenerate = async ({ items, layers, count, isTmp }) => {
    !isTmp && setTmp({ items, layers });
    if (!items || items.length === 0 || !count) return;

    setStep(2);
    // setLoading(true);

    const result = await create({
      items,
      layers,
      count,
    });
    setGenerated(result);
    // setStep(4);
  };

  React.useEffect(() => {
    if (generated && generated.length > 0) {
      setStep(4);
    }
  }, [generated, plan]);

  const handleSave = async (items) => {
    //todo
    if (items.length > 100) {
      // setStep(5);
      setLoading(true);

      const dataURL = await save({ items, address });

      // Create a Checkout Session.
      const response = await fetchPostJSON("/api/checkout_sessions", {
        amount: (items.length - 100) * 0.1,
        download: dataURL,
      });

      if (response.statusCode === 500) {
        console.error(response.message);
        return;
      }

      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
      setModalShow(true);
      setLoading(false);
    }
    if (items.length <= 100) {
      setLoading(true);
      const dataURL = await save({ items, address });
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = dataURL;
      // the filename you want
      a.download = "archive.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setModalShow(true);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setStep(1);
    setGenerated(null);
  };

  const handleSelectPlan = (type) => {
    setActivePrice(true);
    setPlan(type);
    setStep(1);
  };

  const handlePricing = (type) => {
    setStep(3);
  };

  React.useEffect(() => {
    if (plan && plan === "free" && count) {
      setCount(100);
      setCanChangeCount(true);
      // setStep(1);
    }
  }, [plan]);

  const [count, setCount] = React.useState(null);
  const [canChangeCount, setCanChangeCount] = React.useState(true);
  const [activeNft, setActiveNft] = React.useState(false);
  const [activePrice, setActivePrice] = React.useState(false);
  const [activeCollection, setActiveCollection] = React.useState(false);

  const handleCountChange = React.useCallback(
    (e) => {
      setActiveNft(false);
      const c = Number(e.target.value);
      if (plan === "free" && c <= 100) setCount(e.target.value);
      if (plan === "upfront" && c <= 10000) setCount(e.target.value);
      if (plan === "minting-fee" && c <= 10000) setCount(e.target.value);
    },
    [count, plan]
  );

  const handleCountSave = () => setCanChangeCount(false);

  return (
    <Layout
      headerIsTransparent={step !== 1 && step !== 3 && step !== 5}
      backgroundColor
    >
      <>
        <Space100></Space100>
        <SuccessModal show={modalShow} onHide={() => setModalShow(false)} />
        {/*{loading && <Loading />}*/}
        <div style={{ display: step === 1 ? "block" : "none" }}>
          <NewProject
            onGenerate={handleGenerate}
            pricing={plan}
            onPricingClick={handlePricing}
            onCountChange={handleCountChange}
            onCountSave={handleCountSave}
            setActiveCollection={setActiveCollection}
            activeCollection={activeCollection}
            count={count}
            setActivePrice={setActivePrice}
            activePrice={activePrice}
            setActiveNft={setActiveNft}
            activeNft={activeNft}
            canChangeCount={canChangeCount}
          />
        </div>
        {step === 2 && (
          <>
            <PageHeader title="Preview Images" />
            <NewProjectWaiting />
          </>
        )}
        {step === 3 && <NewProjectPricing onSelect={handleSelectPlan} />}
        {step === 4 && (
          <>
            <PageHeader title="Preview Images" />
            <NewProjectPreview
              onGoBack={handleGoBack}
              onSave={handleSave}
              items={generated}
            />
          </>
        )}
        {/* {step === 5 && (
          <>
            <StripeTestCards />
          </>
        )} */}
      </>
    </Layout>
  );
};

export default Index;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 11;
  opacity: 0.5;
`;
const Space100 = styled.div`
  height: 100px;
`;
const Text = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: red;
`;

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
