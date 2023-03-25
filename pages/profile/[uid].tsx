import React from "react";
import { GetServerSideProps } from "next";
import { useWeb3 } from "@3rdweb/hooks";
import Layout from "components/Layout";
import PageHeader from "components/PageHeader";
import ProfilePageComponent from "components/ProfilePage";

type Props = {
  uid?: string;
};

const ProfilePage: React.FC<Props> = ({ uid }) => {
  const { address } = useWeb3();

  if (address && uid && address !== uid) return <div>not found</div>;

  return (
    <Layout headerIsTransparent>
      <>
        <PageHeader title="Profile" />
        <ProfilePageComponent />
      </>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      uid: params.uid,
    },
  };
};
