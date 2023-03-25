import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import CollectionLivePage from "components/CollectionLivePage";
import { Container } from "components/elements";

type Props = {};

const CollectionLive_Page: React.FC<Props> = () => {
    return (
        <Layout headerIsTransparent>
            <CollectionLivePage />
        </Layout>
    );
};

export default CollectionLive_Page;
