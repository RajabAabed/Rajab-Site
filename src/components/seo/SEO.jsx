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
        property="og:type"
        content="website"
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
        property="og:url"
        content="https://www.rajababed.com/"
      />
      <meta
        property="og:image"
        content={logo}
      />
      <meta
        property="og:locale"
        content="en_US"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Rajab Aabed",
          url: "https://rajababed.com",
          logo: { logo },
        })}
      </script>
    </Helmet>
  );
}
