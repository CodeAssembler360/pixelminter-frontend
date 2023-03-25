import React from "react";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";

type Props = {
  uid?: string;
};

const ProfilePage: React.FC<Props> = ({ uid }) => {
  return (
    <Layout headerIsTransparent>
      <>
        <PageHeader title="Profile" />
        ...
        {/* <ProfilePageComponent /> */}
      </>
    </Layout>
  );
};

export default ProfilePage;
