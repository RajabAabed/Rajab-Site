import { Helmet } from "react-helmet";
import logo from "/assets/images/logo.svg";

export default function SEO() {
  return (
    <Helmet>
      <title>Rajab Aabed</title>
      <meta
        name="description"
        content="I'm Rajab Aabed, A Software Engineer"
      />
      <meta
        property="og:title"
        content="Rajab Aabed"
      />
      <meta
        property="og:description"
        content="I'm Rajab Aabed, A Software Engineer"
      />
      <meta
        property="og:image"
        content={logo}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Rajab Aabed",
          url: "https://rajabaabed.netlify.app/",
        })}
      </script>
    </Helmet>
  );
}
