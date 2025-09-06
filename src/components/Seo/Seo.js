import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title, description, keywords = [], canonical, author = "Arvin Paolo Diaz" }) => {
  // Ensure keywords is always an array
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : "";

  return (
    <Helmet>
      <title>{title ? `${title} | Arvin's Portfolio` : "Arvin's Portfolio"}</title>
      {description && <meta name="description" content={description} />}
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {author && <meta name="author" content={author} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Add favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default Seo;
