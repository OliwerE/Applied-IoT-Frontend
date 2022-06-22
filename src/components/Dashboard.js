import React, { useEffect, useState } from 'react'

import './Dashboard.css'
import Gauges from './Gauges'
import LineCharts from './LineCharts'


const Dashboard = () => {

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div id='gauge-container'>
        <Gauges />
      </div>
      <div id='chart-container'>
        <LineCharts />
      </div>
    </div>
  )
}

export default Dashboard
