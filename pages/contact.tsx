import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import ContactusPage from "components/ContactusPage";
import { Container } from "components/elements";

type Props = {};

const ContactPage: React.FC<Props> = () => {
    return (
        <Layout headerIsTransparent>
            <ContactusPage />
        </Layout>
    );
};

export default ContactPage;
