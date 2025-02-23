import React from "react"
import { Header, Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
      <Header as='h1' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About</Header>
      <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
      <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
      <p>Explore the region's key boards with us.</p>
      <h3>Note on sourcing</h3>
      <p>The information in Board Explorer is drawn from public records, including governing body agendas and minutes, property ownership data, voter registration rolls, court records, authority and business websites and board members’ social media, gathered over the course of 2020.</p>
      <p>Board Explorer data was collected and checked by James Bell, Nicole C. Brambila, Sophie Burkholder, Emma Folts, Amanda Hernandez, Jourdan Hicks, TyLisa C. Johnson, Veonna King, Rich Lord, Oliver Morrison, Jon Moss, Mitra Nourbakhsh, Juliette Rihl, Kellen Stepler, Amanda Su, Danielle Cruz, Punya Bhasin, Catherine Taipe, William Sekula, Xiaohan Liu and Christopher Hippensteel. Photos by Jay Manning.</p>
      <p>PublicSource periodically updates Board Explorer to address outdated, incomplete or inaccurate information.</p> 
      <p>If anything in Board Explorer is not currently accurate, please email <a style={{ borderBottom: `2px solid #418cff` }} target="_blank" rel="noopener noreferrer" href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
    </Grid.Row>
  </Layout>
)

export default AboutPage

export const Head = () => (
  <SEO title="About" />
)
