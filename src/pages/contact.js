import { graphql } from "gatsby"
import React from "react"
import { Header, Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = ({ data }) => (
  <Layout lastUpdated={data.stories.edges[0].node.data.Date}>
    <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
      <Header as='h1' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>Contact</Header>
      <p>Do you have a question about Board Explorer or want to request a correction? Contact <a style={{ borderBottom: `2px solid #418cff` }} target="_blank" rel="noopener noreferrer" href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
    </Grid.Row>
  </Layout>
)

export const query = graphql`
  query AllNodesQuery {
    stories: allAirtable(filter: {table: {eq: "Stories"}}, sort: {data: {Date: DESC}}, limit: 1) {
      totalCount
      edges {
        node {
          data {
            Date(formatString: "M/D/YYYY")
          }
        }
      }
    }
  }`;

export default ContactPage

export const Head = () => (
  <SEO title="Contact" />
)
