import React from "react"
import { jsonLdScriptProps } from "react-schemaorg";

import { useSiteMetadata } from "../hooks/use-site-metadata"

/**
 * https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/
 */
const SEO = ({ title, description, pathname, jsonLdSchema, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{`Board Explorer | ${seo.title}`}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <script {...jsonLdScriptProps(jsonLdSchema)} />
      {children}
    </>
  )
}

export default SEO;
