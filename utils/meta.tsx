import { Helmet } from "react-helmet-async";

const defaultTitle = "Pixeltrue NFT";
const defaultDescription = "";
const defaultImage = "";
const vkImage = "";

export const GlobalMeta = () => {
  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      defaultTitle={defaultTitle}
      titleTemplate={`%s — ${defaultTitle}`}
      meta={[
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "theme-color", content: "#000000" },
        { name: "description", content: defaultDescription },
        { property: "vk:image", content: vkImage },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: defaultTitle },
        { property: "og:title", content: defaultTitle },
        { property: "og:description", content: defaultDescription },
        { property: "og:image", content: defaultImage },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: defaultTitle },
        { name: "twitter:description", content: defaultDescription },
        { name: "twitter:image", content: defaultImage },
      ]}
      link={[
        { rel: "icon", href: "/favicon.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "apple-touch-icon", href: "/logo256.png" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap",
        },
      ]}
    />
  );
};

interface MetaProps {
  title: string;
}

const Meta = ({ title }: MetaProps) => {
  return (
    <Helmet
      title={title}
      meta={[
        { property: "og:title", content: `${title} — ${defaultTitle}` },
        { name: "twitter:title", content: `${title} — ${defaultTitle}` },
      ]}
    />
  );
};

export default Meta;
