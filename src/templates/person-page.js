import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Grid, Breadcrumb, Table, Item, Label } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

// styles
const tableKey = {
  fontWeight: 900
}

const tableVal = {
  fontFamily: `Roboto`
}

const PersonPage = ({ data }) => {
  if (!data) return null;

  let person = data.person.edges[0].node.data

  let schools = []
  schools.push(
    (person.High_School ? `${person.High_School} (High School)` : null),
    person.College,
    person.College2,
    person.College3
  )

  let phones = []
  phones.push(person.Public_Phone, person.Public_Phone2)

  let positions = _.filter(person.Positions, p => p.data.Expired === null)
  let expiredPositions = _.filter(person.Positions, p => p.data.Expired === true)

  return (
    <Layout>
      <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
        <Grid.Column>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/' style={{ color: `#418cff` }}>Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Person</Breadcrumb.Section>
          </Breadcrumb>
          <Header as='h1'>{person.Name}</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginBottom: `1em` }}>
        <Grid.Column>
          <Header as='h2'>Who they are</Header>
          <Table basic='very' stackable collapsing size='large' style={{ width: `100%` }}>
            <Table.Body>
              <Table.Row>
                <Table.Cell style={tableKey}>Age</Table.Cell>
                <Table.Cell style={tableVal}>{person.Age > 0 ? `${person.Age} years old` : 'Unknown'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={tableKey}>Party affiliation</Table.Cell>
                <Table.Cell style={tableVal}>{!person.Party_Affiliation ? 'Unknown' : person.Party_Affiliation}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={tableKey}>Residence</Table.Cell>
                <Table.Cell style={tableVal}>{!person.Residence ? 'Unknown' : person.Residence}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={tableKey}>Day job</Table.Cell>
                <Table.Cell style={tableVal}>{!person.Work ? 'Unknown' : person.Work}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={tableKey}>Education</Table.Cell>
                <Table.Cell style={tableVal}>{schools.every(s => s === null) ? 'Unknown' : _.compact(schools).join(', ')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={tableKey}>Contact</Table.Cell>
                <Table.Cell style={tableVal}>
                  {phones.every(p => p === null) && !person.Public_Email ? 'Unknown' : null}
                  {_.compact(phones).join(', ')} <br/>
                  {!person.Public_Email ? null 
                    : <a style={{ borderBottom: `2px solid #418cff`, fontFamily: `Roboto` }} target="_blank" rel="noopener noreferrer" href={`mailto:${person.Public_Email}`}>
                        {person.Public_Email}
                      </a>
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          {positions?.length > 0 ? (
            <>
              <Header as='h2'>Boards they serve on</Header>
              <Item.Group>
                {positions.map((p, i) => 
                  !p.data.Board[0].data.Done ? `` : 
                    <Item key={i} style={{ background: `#f5f5f5`, borderLeft: `5px solid #418cff`, padding: `.8em` }}>
                      <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3' style={{ display: `flex`, flexDirection: `row`, justifyContent: `space-between` }}>
                          <Link to={`/board/${p.data.Board[0].data.Slug}`}>
                            {p.data.Board[0].data.Name}
                          </Link>
                          <div>
                            {p.data.Board[0].data.Govt_Level.map((g, i) => 
                              <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`}>
                                {g.toUpperCase()}
                              </Label>
                            )}
                          </div>
                        </Item.Header>
                        <Item.Meta>{p.data.Office.substring(3)}</Item.Meta>
                        <Item.Description style={{ fontFamily: `Roboto` }}>
                          {p.data.Board[0].data.Description}
                        </Item.Description>
                        <Item.Extra style={{ fontFamily: `Roboto`, color: `rgba(0,0,0,.85)` }}>
                          {!p.data.Term_Length ? `Unknown term length ` 
                            : p.data.Term_Length > 0 ? `${p.data.Term_Length}-year term: ` :  `Term length ${p.data.Term_Length.toLowerCase()}: `}
                          {!p.data.Term_Begin_Date || p.data.Term_Begin_Date === 'Unknown' ? `` : `first served ${p.data.Term_Begin_Date}`}
                          {!p.data.Term_End_Date ? `` : isNaN(p.data.Term_End_Date.charAt(0)) ? `` : `, current term ends ${p.data.Term_End_Date}.`}
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                )}
              </Item.Group>
            </>
          ) : null}
          {expiredPositions?.length > 0 ? (
            <>
              <Header as='h2'>Boards they used to serve on</Header>
              <Item.Group>
                {expiredPositions.map((p, i) => 
                  !p.data.Board[0].data.Done ? `` : 
                    <Item key={i} style={{ background: `#f5f5f5`, borderLeft: `5px solid #8d8d8d`, padding: `.8em` }}>
                      <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3' style={{ display: `flex`, flexDirection: `row`, justifyContent: `space-between` }}>
                          <Link to={`/board/${p.data.Board[0].data.Slug}`}>
                            {p.data.Board[0].data.Name}
                          </Link>
                          <div>
                            {p.data.Board[0].data.Govt_Level.map((g, i) => 
                              <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`}>
                                {g.toUpperCase()}
                              </Label>
                            )}
                          </div>
                        </Item.Header>
                        <Item.Meta>{p.data.Office.substring(3)}</Item.Meta>
                        <Item.Description style={{ fontFamily: `Roboto` }}>
                          {p.data.Board[0].data.Description}
                        </Item.Description>
                        <Item.Extra style={{ fontFamily: `Roboto`, color: `rgba(0,0,0,.85)` }}>
                          {!p.data.Term_Length ? `Unknown term length ` 
                            : p.data.Term_Length > 0 ? `${p.data.Term_Length}-year term: ` :  `Term length ${p.data.Term_Length.toLowerCase()}: `}
                          {!p.data.Term_Begin_Date || p.data.Term_Begin_Date === 'Unknown' ? `` : `first served ${p.data.Term_Begin_Date}`}
                          {!p.data.Term_End_Date ? `` : isNaN(p.data.Term_End_Date.charAt(0)) ? `` : `, last term ended ${p.data.Term_End_Date}.`}
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                )}
              </Item.Group>
            </>
          ) : null}
        </Grid.Column>
      </Grid.Row>
    </Layout>
  )
}

export const query = graphql`
  query GetPersonDetails (
    $name: String!
  ) {
    person: allAirtable(filter: {table: {eq: "People"}, data: {Name: {eq: $name}}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Number_of_Positions
            Age
            Residence
            Work
            Party_Affiliation
            High_School
            College
            College2
            College3
            Public_Phone
            Public_Phone2
            Public_Email
            Positions {
              data {
                Name
                Office
                Term_Begin_Date
                Term_End_Date
                Term_Length
                Expired
                Board {
                  data {
                    Name
                    Slug
                    Description
                    Done
                    Govt_Level
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default PersonPage;

export const Head = ({ data }) => {
  let person = data.person.edges[0].node.data
 
  return (
    <SEO title={`${person.Name}`} />
  )
}
