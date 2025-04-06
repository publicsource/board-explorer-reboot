import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Label, List, Grid, Breadcrumb, Card, ListItem, Icon } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BoardPage = ({ data }) => {
  if (!data) return null;
  
  let board = data.board.edges[0].node.data

  let positions = _.filter(board.Positions, p => p.data.Expired === null)
  let expiredPositions = _.filter(board.Positions, p => p.data.Expired === true)

  let orderedPositions = _.orderBy(
    positions,
    [positions => positions.data.Office, positions => positions.data.Person[0].data.Name],
    ['asc', 'asc']
  )

  let stories = board.Stories;
  let orderedStories = _.orderBy(
    stories,
    [stories => new Date(stories.data.Date)],
    ['desc']
  )

  return (
    <Layout lastUpdated={data.globalLastStory.edges[0].node.data.Date}>
      <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
        <Grid.Column>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/' style={{ color: `#418cff` }}>Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Board</Breadcrumb.Section>
          </Breadcrumb>
          <Header as='h1'>{board.Name} ({board.Acronymn})</Header>
          <Header.Subheader>
            {board.Govt_Level.map((g, i) =>
              <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`} style={{ marginRight: `6px` }}>
                {g.toUpperCase()}
              </Label>
            )}
          </Header.Subheader>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h2'>What it does</Header>
          <p style={{ fontSize: `1.1em` }}>{board.Description}</p>
          <Header as='h3'>When it meets</Header>
          <p style={{ fontSize: `1.1em` }}>{!board.Meeting_Time ? 'Unknown' : board.Meeting_Time}</p>
          <Header as='h3'>
            Links
            <Icon name="external" style={{ marginLeft: `5px` }} color='grey' horizontal />
          </Header>
          <List relaxed>
            <ListItem>
              <a href={board.Website} target="_blank" rel="noopener noreferrer" style={{ fontFamily: `Roboto`, borderBottom: `2px solid #418cff`, fontSize: `1.1em` }}>
                {`Homepage`}
              </a>
            </ListItem>
            {board.Meeting_Link && (<ListItem>
              <a href={board.Meeting_Link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: `Roboto`, borderBottom: `2px solid #418cff`, fontSize: `1.1em` }}>
                {`Meetings and minutes`}
              </a>
            </ListItem>)}
          </List>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff` }}>{positions.length} members</Header>
          <List relaxed divided size='large'>
            {orderedPositions?.map((m, i) => (
              <List.Item key={i}>
                <List.Header>
                  <Link to={`/person/${m.data.Person[0].data.Slug}`}>
                    {m.data.Person[0].data.Name}
                  </Link>
                </List.Header>
                <List.Description style={{ fontFamily: `Roboto` }}>
                  {m.data.Office.slice(2)}{!m.data.Term_Begin_Date || m.data.Term_Begin_Date === 'Unknown' ? '' : `, joined ${m.data.Term_Begin_Date}`}
                </List.Description>
              </List.Item>
            ))}
          </List>
          {expiredPositions?.length > 0 ? (
            <>
              <Header as='h3' style={{ borderBottom: `5px solid #8d8d8d` }}>{expiredPositions.length} prior members</Header>
              <List relaxed divided size='large'>
                {expiredPositions.map((m, i) => (
                  <List.Item key={i}>
                    <List.Header>
                      <Link to={`/person/${m.data.Person[0].data.Slug}`}>
                        {m.data.Person[0].data.Name}
                      </Link>
                    </List.Header>
                    <List.Description style={{ fontFamily: `Roboto` }}>
                      Served as {m.data.Office.slice(2)} {m.data.Term_Begin_Date} - {m.data.Term_End_Date}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </>
          ) : null}
        </Grid.Column>
      </Grid.Row>
      {orderedStories?.length > 0 ?
        <Grid.Row style={{ display: `flex`, flexDirection: `column`, marginTop: `1em` }}>
          <Grid.Column>
            <Header as='h2'>Stories</Header>
            <Card.Group>
              {orderedStories.map((s, i) => (
                <Card key={i} fluid style={{ borderLeft: `5px solid #418cff` }}>
                  <Card.Content>
                    <Card.Header as='h5' style={{ marginBottom: 0 }}>
                      <a href={s.data.Link} target="_blank" rel="noopener noreferrer">{s.data.Title}</a>
                    </Card.Header>
                    <Card.Meta>{s.data.Date}</Card.Meta>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        : ``}
    </Layout>
  )
}

export const query = graphql`
  query GetBoardDetails($name: String!) {
    board: allAirtable(
      filter: {table: {eq: "Boards"}, data: {Name: {eq: $name}}}
      sort: {data: {Stories: {data: {Date: DESC}}}}
    ) {
      totalCount
      edges {
        node {
          data {
            Name
            Acronymn
            Govt_Level
            Description
            Meeting_Time
            Meeting_Link
            Website
            Number_of_Members
            Positions {
              data {
                Office
                Term_Length
                Term_Begin_Date
                Term_End_Date
                Expired
                Person {
                  data {
                    Name
                    Slug
                  }
                }
              }
            }
            Stories {
              data {
                Title
                Link
                Date(formatString: "MMMM D, YYYY")
              }
            }
          }
        }
      }
    }
    globalLastStory: allAirtable(filter: {table: {eq: "Stories"}}, sort: {data: {Date: DESC}}, limit: 1) {
      totalCount
      edges {
        node {
          data {
            Date(formatString: "M/D/YYYY")
          }
        }
      }
    }
  }
`

export default BoardPage;

export const Head = ({ data }) => {
  let board = data.board.edges[0].node.data
 
  return (
    <SEO title={`${board.Name}`} />
  )
}
