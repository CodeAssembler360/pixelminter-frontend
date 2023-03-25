import React from "react";
import Layout from "components/Layout";
import ProjectPage from "components/ProjectPage";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Layout headerIsTransparent>
      <ProjectPage />
    </Layout>
  );
};

export default Index;
