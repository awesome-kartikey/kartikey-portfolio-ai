import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, type = 'website', href }) => {
  const defaultTitle = "Kartikey Kumar | Full Stack Developer & AI Engineer";
  const defaultDescription = "Kartikey Kumar | AI Engineer & Full Stack Developer specializing in Next.js, AI Integrations, and SaaS development. Based in Roorkee, India.";
  const siteUrl = "https://kartikey.is-a.dev"; 
  const defaultImage = `${siteUrl}/og-image.png`;

  const finalTitle = title ? `${title} | Kartikey Kumar` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalUrl = href || window.location.href;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name='description' content={finalDescription} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={finalUrl} />

      {/* Twitter */}
      <meta name="twitter:creator" content="@awesome_kartike" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
};

export default Seo;
