import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import _ from "lodash"
import { getDecade } from 'date-fns'
import { Grid } from "semantic-ui-react"

import AgeBarChart from "./age-bar-chart"
import GenderPieChart from "./gender-pie-chart"
import RaceTreemapChart from "./race-treemap-chart"

const citationStyles = {
  fontSize: '12px', 
  fontFamily: 'inherit', 
  color: '#5d5d5d', 
  textAlign: 'right',
}

const ChartsWrapper = ({ filter }) => {
  const data = useStaticQuery(graphql`
    query ChartStatsQuery {
    chartStats: allAirtable(filter: {
        table: {eq: "Positions"}, 
        data: {Expired: {ne: true}}
    }) {
      totalCount
      edges {
        node {
            data {
            Position_ID
            Board {
              data {
                Govt_Level_Charts
              }
            }
            Person {
              data {
                Race
                Gender
                Birthdate (formatString: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    }
  }
  `)

  // Filter by juridiction based on form input
  let filteredChartData = data?.chartStats?.edges;

  if (filter !== 'All') {
    filteredChartData = data?.chartStats?.edges.filter((e) => e.node.data?.Board?.[0]?.data?.Govt_Level_Charts === filter);
  }

  // Calculate summary stats
  let totalActivePositions = filteredChartData?.length;
  let byRace = _.countBy(filteredChartData, 'node.data.Person[0].data.Race');
  let bySex = _.countBy(filteredChartData, 'node.data.Person[0].data.Gender');

  let dataWithDecades = filteredChartData.map(e => {
    let d = e.node.data?.Person?.[0]?.data;
    return ({ ...d, 'Decade': d?.Birthdate ? getDecade(new Date(d?.Birthdate)) : null })
  });
  let byDecade = _.countBy(dataWithDecades, 'Decade');
  
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <AgeBarChart data={byDecade} filter={filter} />
            <p style={{ ...citationStyles, marginBottom: 0 }}>
              Note: PublicSource was able to determine the ages of {totalActivePositions - byDecade['null']} of {totalActivePositions} active board members.
            </p>
            <p style={citationStyles}>
              Source: Publicly available information including voter registration records.
            </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
            <RaceTreemapChart data={byRace} filter={filter} />
            <p style={{ ...citationStyles, marginBottom: 0 }}>
              Note: PublicSource was able to determine the race or ethnicity of {totalActivePositions - byRace['null']} of {totalActivePositions} active board members.
            </p>
            <p style={citationStyles}>
              Sources: Publicly available records including social media, resumes and records of public appearances.
            </p>
        </Grid.Column>
        <Grid.Column>
            <GenderPieChart data={bySex} filter={filter} />
            <p style={{ ...citationStyles, marginBottom: 0 }}>
              Note: PublicSource was able to determine the gender of {bySex['null'] ? `${totalActivePositions - bySex['null']} of` : 'all'} {totalActivePositions} active board members.
            </p>
            <p style={citationStyles}>
              Sources: Voter registration records and social media.
            </p>
        </Grid.Column>
      </Grid.Row>
    </>
  )
}

export default ChartsWrapper;
