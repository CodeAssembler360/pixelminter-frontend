import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import FAQ from "components/FAQ";
import GuidePagePlans from "components/GuidePagePlans";
import metaMask from "assets/svg/metamask.svg";
import coinbase from "assets/svg/coinbase.svg";
import walletConnect from "assets/svg/wallet-connect.svg";
import choosePricing from "assets/svg/choose-pricing.svg";
import uploadNFT from "assets/svg/upload-nft.svg";
import namingNFT from "assets/svg/naming-nft.svg";
import renameLayer from "assets/svg/rename-layer.svg";
import settingRarity from "assets/svg/setting-rarity.svg";
import viewCollection from "assets/svg/view-collection.svg";
import forFree from "assets/svg/for-free.svg";
import payUpfront from "assets/svg/pay-up-front.svg";
import forMinting from "assets/svg/for-minting.svg";

const nav = [
  {
    title: "Connect Your Wallet",
    href: "#connect-wallet",
  },
  {
    title: "Pricing Plans",
    href: "#choose-pricing",
  },
  {
    title: "Create an NFT Collection",
    href: "#create-collection",
  },
  {
    title: "Generate Your Collection",
    href: "#generate-collection",
  },
  {
    title: "View Your Collection",
    href: "#view-collection",
  },
  {
    title: "Minting",
    href: "#minting",
  },
  {
    title: "FAQs",
    href: "#faq",
  },
];

const Guide_Page = () => {
  return (
    <Root>
      <Container>
        <Row>
          <Col lg={10}>
            <MainTitle>What is Pixel Minter?</MainTitle>
            <Text>
              The most user-friendly NFT artwork generator and minting tool in
              one. Pixel Minter allows you to create large-scale collections and
              allow others to mint and sell your NFTs on a marketplace like
              OpenSea.
            </Text>
            <Divider />
            <Title>Start Creating</Title>
            <Row>
              <Col lg={6}>
                {nav.slice(0, 4).map((item, index) => (
                  <a
                    key={`guide-nav-${index}`}
                    href={item.href}
                    className="btn btn-light-2 btn-lg w-100 shadow-none text-start mb-3"
                  >
                    {item.title}
                  </a>
                ))}
              </Col>
              <Col lg={6}>
                {nav.slice(4).map((item, index) => (
                  <a
                    key={`guide-nav-${index}`}
                    href={item.href}
                    className="btn btn-light-2 btn-lg w-100 shadow-none text-start mb-3"
                  >
                    {item.title}
                  </a>
                ))}
              </Col>
            </Row >
            <div  id="connect-wallet" ></div>
            <Divider />
            <div  ></div>
            <Title>Connect your Wallet</Title>
            <Text>
              Sign in with your preferred wallet. If you still don’t have one,
              you can set up your wallet set up your wallet by choosing from the
              option below:
            </Text>
            <Section>
              <DFlex className="gap-5">
                <DFlex className="border py-3 px-5 rounded-3 my-2">
                  <Image src={metaMask} />
                </DFlex>
                <DFlex className="border py-3 px-5 rounded-3 my-2">
                  <Image src={coinbase} />
                </DFlex>
                <DFlex className="border py-3 px-5 rounded-3 my-2">
                  <Image id="choose-pricing" src={walletConnect} />
                </DFlex>
              </DFlex>
              <Divider  />
            </Section>
            <Section >
              <Title>Choose your Pricing Plan</Title>
              <Text  >
                Pixel Minter offers 3 pricing plans: Free, Pay Up-front, and
                Minting Fee
              </Text>
              <GuidePagePlans/>
            <div className="py-2" id="create-collection"></div>
              <Divider  />
            </Section>
            <Section>
              <Title>Create an NFT Collection</Title>
              <Text>
                After successfully logging in you will be redirected to the
                randomizer space click "Create a new Project"
              </Text>
              <Image className="mb-5" src={choosePricing} />
              <Divider />
            </Section>

            <Title>Uploading Image Layers</Title>
            <Text>
              You will now see the screen where you can upload different layers
              for your NFTs.
            </Text>
            <Image className="mb-5" src={uploadNFT} />
            <Divider />
            <Text>
              After naming your collection you can now start uploading the
              layers you made for your collection.  Ensure that the images you
              will be uploading are resized to 500x500px and have a transparent
              background
            </Text>
            <Image className="mb-5" src={namingNFT} />
            <Divider />
            <Text>Make sure to rename each layer of your character.</Text>
            <Image className="mb-5" src={renameLayer} />
            <Text>
              When you already uploaded all of the layers for your collection,
              you can see a preview of a character on the left side of the page.
            </Text>
            <Divider />
            <Title>Setting Rarity</Title>
            <Text>
              Now you can set the rarity of each layer. There are 4 default
              rarity settings on the software: common, uncommon, rare, and super
              rare. You can also set your own custom percentage for any layer. 
            </Text>
            <Image className="mb-5" src={settingRarity} />
            <div className="py-2"  id="generate-collection"></div>
            <Divider />
            <Section>
              <Title>Generate Collection</Title>
              <Text>
                Once you have added all the layers, configured the rarity and
                named each layer. You can proceed to generate your collection.
              </Text>
              <Text>
                Click Generate Collection button and enter your desired number
                of NFT and wait for the software to generate all of the
                illustrations for your collection.
              </Text>
              <div  id="view-collection" className="py-2"></div>
              <Divider />
            </Section>
            <Section>
              <Title>View Your Collection</Title>
              <Text>
                After the collection has been generated, you will be redirected
                to a preview page where you can see all of the generated
                illustrations.
              </Text>
              <Image className="mb-5" src={viewCollection} />
              <Divider />
              <Title>View Your Collection</Title>
              <SecTitle>For Free</SecTitle>
              <Text>
                After generating the collection you will be able to download it
                instantly by clicking Download Collection 
              </Text>
              <Image className="mb-5" src={forFree} />
              <br />
              <br />
              <br />
              <Title>For Pay Up-Front</Title>
              <Text>
                You will pay $ 0.10 for each illustration generated. If you
                generated 1000 illustrations, you will need to pay $100.
              </Text>
              <Text>
                When the payment confirmation is done, you will be able to
                download your generated collection right away. 
              </Text>
              <Image   className="mb-5" src={payUpfront} />
              <br id="minting" />
              <br />
              <br />
              <Section>
                <Title>For Minting Fee</Title>
                <Image className="mb-5" src={forMinting} />
                <div id="faq" className="py-2"></div>
                <Divider />
              </Section>
            </Section>
            <Section >
              <Title>Frequently Asked Questions</Title>
              <FAQ />
            </Section>
          </Col>
        </Row>
      </Container>
    </Root>
  );
};

export default Guide_Page;

const Root = styled.div`
  padding-top: 200px;
  padding-bottom: 100px;

  @media (max-width: 992px) {
    padding-top: 140px;
  }
`;

const DFlex = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Section = styled.section``;

const MainTitle = styled.h1`
  color: #0f123d;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Title = styled.h2`
  color: #0f123d;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top:30px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
    margin-bottom:20px;
  }
`;

const SecTitle = styled.h3`
  color: #0f123d;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Text = styled.p`
  color: #5d5d6a;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 26px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #bcc1cb;
  margin: 40px 0;
`;

const Image = styled.img`
  color: #0f123d;
`;
