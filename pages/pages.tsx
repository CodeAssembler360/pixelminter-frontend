import React from "react";
import Link from "next/link";
import Layout from "components/Layout";

const links = [
  {
    title: "Home Page",
    href: "/",
  },
  {
    title: "Projects (empty)",
    href: "/projects",
  },
  {
    title: "Projects (count)",
    href: "/projects?count=1",
  },
  {
    title: "Project Page",
    href: "/project",
  },
  {
    title: "Create a project (no layers)",
    href: "/new?state=no-layers",
  },
  {
    title: "Create a project (background)",
    href: "/new?state=background",
  },
];

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Layout>
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <Link href={link.href}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Index;
