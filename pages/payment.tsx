import React from "react";
import Layout from "components/Layout";
import PaymentPage from "components/PaymentPage";

type Props = {};

const Payment: React.FC<Props> = () => {
    return (
        <Layout headerIsTransparent backgroundColor>
            <PaymentPage />
        </Layout>
    );
};

export default Payment;

