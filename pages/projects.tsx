import React from "react";
import Layout from "components/Layout";
import ProjectsPage from "components/ProjectsPage";
import { useWeb3 } from "@3rdweb/hooks";
import firebase from "firebase/firebaseClient";

type Props = {};

const Index: React.FC<Props> = () => {
  const [projects, setProjects] = React.useState(null);
  const { address } = useWeb3();

  const fetchUser = async () => {
    const dataRef = await firebase.firestore().collection("users").doc(address);
    const data = await dataRef.get();

    return data.data().projects;
  };

  React.useEffect(() => {
    address && fetchUser().then((list) => setProjects(list));
  }, [address]);

  return (
    <Layout headerIsTransparent>
      <ProjectsPage projects={projects} />
    </Layout>
  );
};

export default Index;
