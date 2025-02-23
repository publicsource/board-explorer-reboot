import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from "lodash"

const GenderPieChart = ({ data, filter }) => {
    let formattedData = []
    Object.keys(data).forEach(key => {
        formattedData.push({
            name: key,
            y: data[key],
            dataLabels: {
                distance: data[key] < 5 ? 30 : -60
            }
        })
    })

    const options = {
        chart: {
            type: 'pie',
            style: {
                font: 'inherit'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    // format: '{point.name}<br/>{point.percentage:.1f}%',
                    color: '#000',
                    style: { 
                        textOutline: 'none',
                        fontSize: '14px'
                    },
                }
            }
        },
        title: {
            text: `Gender, ${_.lowerCase(filter)} board members`,
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '1.3em'
            }
        },
        series: [{
            data: formattedData,
            colorByPoint: true,
            colors: ['#418cff', '#b1cfd5', '#fb6927']
        }],
        tooltip: {
            pointFormat: '{point.y} board members ({point.percentage:.1f}%)',
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

export default GenderPieChart;
