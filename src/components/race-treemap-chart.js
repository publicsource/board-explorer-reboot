import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addTreemapModule from 'highcharts/modules/treemap'
import _ from "lodash"

// if (typeof Highcharts === 'object') {
//     addTreemapModule(Highcharts)
// }

const RaceTreemapChart = ({ data, filter }) => {
    let colors = {
        'White': '#418cff',
        'Black': '#b1cfd5',
        'Asian': '#fb6927',
        'Latino': '#ffb241',
        'Native American': '#0d1c33'
    }

    let formattedData = []
    let denominator = _.sum(_.values(data))

    Object.keys(data).forEach((key) => {
        if (key !== 'null') {
            formattedData.push({
                name: key,
                value: data[key],
                percent: ((data[key] / denominator) * 100).toFixed(1),
                color: colors[key]
            })
        }
    })

    const options = {
        title: {
            text: `Race or ethnicity, ${_.lowerCase(filter)} board members`,
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '1.3em'
            }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: formattedData
        }],
        tooltip: {
            pointFormat: '{point.value} {point.name} board members ({point.percent}%)',
            shadow: false
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        chart: {
            style: {
                font: 'inherit'
            }
        },
        plotOptions: {
            treemap: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    color: '#000',
                    style: {
                        textOutline: 'none',
                        fontSize: '14px'
                    }
                }
            }
        }
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options} />
    )
}

export default RaceTreemapChart;
