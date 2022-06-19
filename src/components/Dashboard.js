import React, { useEffect, useState } from 'react'
import GaugeChart from 'react-gauge-chart'

import './Dashboard.css'
import Gauge from './Gauge'

const Dashboard = () => {
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensors`).then(res => {
      return res.json()
    }).then(json => {
      console.log(json)
      setSensors(json.sensors)
    }).catch(err => {
      console.error(err)
    })
  },[])

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div id='chart-container'>
        {sensors.map(sensor => {
          return <Gauge sensor={sensor} />
        })}
      </div>
    </div>
  )
}

export default Dashboard
