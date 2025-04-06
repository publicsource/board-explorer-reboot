import { graphql, Link } from "gatsby"
import orderBy from "lodash/orderBy"
import React, { useState } from "react"
import { Card, Divider, Form, Grid, Header, Label, List, Radio } from "semantic-ui-react"

import ChartsWrapper from "../components/charts-wrapper"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  // List of all boards
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")

  let orderedBoards = orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = orderedBoards.filter((o) => o.Done);

  // Stories
  let stories = data.stories.edges.map(e => e.node.data)
  const lastUpdatedStoryDate = new Date(stories[0].Date).toLocaleDateString(); // GraphQL query sorted DESC by default

  // Chart controls
  let chartOptions = [
    {
      value: "All",
      label: "All active board members",
    },
    {
      value: "City",
      label: "CITY"
    },
    {
      value: "County",
      label: "COUNTY"
    },
    {
      value: "Joint",
      label: "Joint CITY COUNTY"
    }
  ]
  const [chartFilter, setChartFilter] = useState('All');

  return (
    <Layout lastUpdated={lastUpdatedStoryDate}>
      <Grid.Row style={{ marginTop: `1em` }}>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>
            In the spotlight: {readyBoards?.length} panels that make decisions for Pittsburgh, Allegheny County
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        {/* LIST OF ALL BOARDS */}
        <Grid.Column>
          <List divided relaxed size='large' style={{ height: `550px`, overflowY: `scroll` }}>
            {readyBoards.map((b, i) => (
              <List.Item key={i}>
                {b.Done ?
                  <Link to={`/board/${b.Slug}`}>{b.Name}</Link>
                  : <span style={{ color: `rgba(0,0,0,0.4)` }}>{b.Name}</span>
                }
                {b.Done ?
                  b.Govt_Level.map((g, i) =>
                    <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`} style={{ marginLeft: `6px` }}>
                      {g.toUpperCase()}
                    </Label>
                  ) : <Label key={i} style={{ marginLeft: `6px` }}>
                    {`COMING SOON`}
                  </Label>
                }
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        {/* FEATURED STORIES */}
        <Grid.Column>
          <Card.Group>
            {stories.map((s, i) => (
              <Card key={i} fluid style={{ backgroundColor: `#d3e3ff`, marginLeft: 0 }}>
                <Card.Content>
                  <Card.Header style={{ marginBottom: 0 }}>
                    <a href={s.Link} target="_blank" rel="noopener noreferrer">{s.Title}</a>
                  </Card.Header>
                  <Card.Meta>{s.Date}</Card.Meta>
                  <Divider />
                  <Card.Description>
                    {"Featuring "}
                    {s.Boards?.map((b, i) => (
                      <>
                      <Link key={i} to={`/board/${b.data.Slug}`}>{b.data.Name}</Link>
                      {s.Boards.length > 1 && i < s.Boards.length - 1 ? ", ": ""}
                      </>
                    ))}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>

      {/* ABOUT THIS PROJECT */}
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About this project</Header>
          <p>The Pittsburgh region is run in large part by around 500 unelected members of boards, commissions and other public agencies.</p>
          <p>Board members usually don’t get headlines. Those go to the mayor, the county executive, council members, controllers and directors. But boards often push for new policies, award contracts and grants, address demands for inclusion and equity, and more.</p>
          <p>The board structure is more diverse than it was 15 years ago, but gaps remain. It’s time for deeper exploration.</p>
          <p>PublicSource’s new Board Explorer sheds light on these panels and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
          <p>We have included 56 county, city and joint boards and commissions. As more panels form and membership changes, we'll periodically update.</p>
          <p>Explore with us, and, if you have a story idea or something you think we should investigate, please <Link to="/contact" style={{ borderBottom: `2px solid #418cff` }}>let us know</Link>.</p>
        </Grid.Column>
      </Grid.Row>

      {/* CHARTS */}
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>
            How diverse are the city and county boards and commissions?
          </Header>
          <Form style={{ background: `#d3e3ff`, padding: `1em` }}>
            <Header as='h4'>Filter the charts by jurisdiction:</Header>
            {chartOptions.map((c, i) => (
              <Form.Field inline key={i}>
                <Radio
                  label={{
                    children: c.value === 'All' ? c.label
                      : c.value === "Joint" ? <>Joint <Label color='orange'>CITY</Label> <Label color='yellow'>COUNTY</Label></>
                        : <><Label color={c.value === 'City' ? 'orange' : 'yellow'}>{c.label}</Label></>
                  }}
                  name='radioGroup'
                  value={c.value}
                  checked={chartFilter === c.value}
                  onChange={() => setChartFilter(c.value)}
                />
              </Form.Field>
            ))}
          </Form>
        </Grid.Column>
      </Grid.Row>
      <ChartsWrapper filter={chartFilter} />
    </Layout>
  )
}

export const query = graphql`
  query AllNodesQuery {
    boards: allAirtable(filter: {table: {eq: "Boards"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Acronymn
            Slug
            Done
            Next
            Govt_Level
            Number_of_Members
          }
        }
      }
    }
    stories: allAirtable(filter: {table: {eq: "Stories"}}, sort: {data: {Date: DESC}}, limit: 3) {
      totalCount
      edges {
        node {
          data {
            Title
            Date(formatString: "MMMM D, YYYY")
            Link
            Boards {
              data {
                Name
                Slug
              }
            }
          }
        }
      }
    }
  }`;

export default IndexPage

export const Head = () => (
  <SEO title="Home" />
)
