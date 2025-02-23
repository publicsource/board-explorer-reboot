import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <h1>Not found</h1>
    <p>This page doesn't exist. Head back to the <Link to="/">homepage</Link>.</p>
  </Layout>
)

export default NotFoundPage

export const Head = () => (
  <SEO title="Not found (404)" />
)
