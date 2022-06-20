import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import './LineChart.css'

const LineChart = ({ sensorName, sensorValues }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [chartData, setChartData] = useState({})

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  useEffect(() => {
    const timeAgoLabels = []
    const sensorData = []

    sensorValues.map((sensorReport) => {
      timeAgoLabels.push(sensorReport.hoursAgo + ' hours ago') // change to moment, send Date from backend??
      sensorData.push(sensorReport.value)
    })

    const label = getLabel(sensorName)

    const data = {
      labels: timeAgoLabels.reverse(), // timeAgoLabels.reverse()
      datasets: [
        {
          label,
          data: sensorData.reverse(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    }

    setChartData(data)
    setHasLoaded(true)
  }, [])

  const getLabel = (sensorName) => {
    let label
    switch(sensorName) {
      case 'temperature':
        label = 'Temperature (°C)'
        break;
      case 'humidity':
        label = 'Humidity (%)'
        break;
      case 'heat-index':
        label = 'Heat Index (°C)'
        break;
      case 'atmospheric-pressure':
        label = 'Atmospheric pressure (kPa)'
        break;
      case 'air-quality':
        label = 'Air quality (VOC Index)'
        break;
      default:
        label = 'placeholder'
    }
    return label
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#707070'
        }
      },
      title: {
        display: true,
        text: sensorName.replaceAll('-', ' '),
        color: '#707070'
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: "#707070"
        },
        ticks: {
          color: '#707070'
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: "#707070"
        },
        ticks: {
          color: '#707070'
        }
      }
    }
  }

  return (
    <div className='line-chart'>
      {hasLoaded ? <Line options={chartOptions} data={chartData} /> : null}
    </div>
    )
}

export default LineChart