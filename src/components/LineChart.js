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
  const [valuesFromSensors, setValuesFromSensors] = useState(sensorValues)
  const [chartData, setChartData] = useState({})
  const [chartTimeUnit, setChartTimeUnit] = useState('hour')

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

    let timeUnit
    if (chartTimeUnit === 'day') {
      timeUnit = ' days ago'
    } else {
      timeUnit = ' hours ago'
    }

    for (let i = 0; i < valuesFromSensors.length; i++) {
      timeAgoLabels.push(valuesFromSensors[i].timeAgo + timeUnit)
      sensorData.push(valuesFromSensors[i].value)
    }

    const label = getLabel(sensorName)

    const data = {
      labels: timeAgoLabels.reverse(), // timeAgoLabels.reverse()
      datasets: [
        {
          label,
          data: sensorData.reverse(),
          spanGaps: true,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    }

    setChartData(data)
    setHasLoaded(true)
  }, [chartTimeUnit, valuesFromSensors])

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
      case 'air-pressure':
        label = 'Air pressure (Pa)'
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
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: sensorName.replaceAll('-', ' '),
        color: '#fff',
                font: {
          size: 25
        }
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
          color: '#fff'
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: "#707070"
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  }

  const handleOnIntervalChange = (e) => {
    const { value } = e.target
    
    let timeUnit
    if (value === '24h') {
      timeUnit = 'hour'
    } else {
      timeUnit = 'day'
    }
    setChartTimeUnit(timeUnit)

    console.log('interval changed!!')
    console.log(value)

    let query = ''
    switch(value) {
      case '24h':
        query = ''
        break;
      case '7d':
       query = '?days=7'
        break;
      case '14d':
        query = '?days=14'
        break;
      case '30d':
        query = '?days=30'
        break;
      default:
        query = ''
    }


    const url = `${process.env.REACT_APP_BASE_URL}/sensors/sensor/avg/${timeUnit}/${sensorName}/${query}`

    fetch(url).then(res => {
      return res.json()
    }).then(json => {
      setValuesFromSensors(json.sensors[sensorName])
      console.log(json)
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className='line-chart'>
      <select onChange={(e) => handleOnIntervalChange(e)} className="interval" name="interval">
        <option value="24h">24 hours</option>
        <option value="7d">7 days</option>
        <option value="14d">14 days</option>
        <option value="30d">30 days</option>
      </select>
      {hasLoaded ? <Line options={chartOptions} data={chartData} /> : null}
    </div>
    )
}

export default LineChart