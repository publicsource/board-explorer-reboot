import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from "lodash"

const AgeBarChart = ({ data, filter }) => {
    let nonNullData = _.omit(data, "null")

    const options = {
        chart: {
            type: 'bar',
            style: {
                font: 'inherit'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    inside: true,
                    align: 'right',
                    color: '#000',
                    style: { 
                        textOutline: 'none'
                    }
                }
            },
            series: {
                pointWidth: 40,
            }
        },
        title: {
            text: `Decade of birth, ${_.lowerCase(filter)} board members`,
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '1.3em'
            }
        },
        series: [{
            data: Object.values(nonNullData),
            color: '#418cff'
        }],
        xAxis: {
            categories: Object.keys(nonNullData),
            labels: {
                enabled: true,
                formatter: function() {
                    return this.value + 's'
                },
                style: {
                    fontWeight: 'bold',
                    fontSize: '1em',
                    color: '#000'
                }
            }
        },
        yAxis: {
            title: {
                enabled: false
            },
            labels: {
                enabled: true
            }
        },
        tooltip: {
            formatter: function() {
                return this.y + ' board members born in the ' + this.key + 's';
            },
            shadow: false
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options} />
    )
}

export default AgeBarChart;
