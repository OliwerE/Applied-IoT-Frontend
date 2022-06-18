import React, { useEffect, useState } from 'react'
import './Dashboard.css'

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
        {sensors.map(s => {
          return <p>{s.sensorName}: {s.value}</p>
        })}
      </div>
    </div>
  )
}

export default Dashboard
