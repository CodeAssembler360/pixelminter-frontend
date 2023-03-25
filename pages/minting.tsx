import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import MintingPage from "components/MintingPage";
import { Container } from "components/elements";

type Props = {};

const Minting_Page: React.FC<Props> = () => {
    return (
        <Layout headerIsTransparent backgroundColor>
            <MintingPage />
        </Layout>
    );
};

export default Minting_Page;
