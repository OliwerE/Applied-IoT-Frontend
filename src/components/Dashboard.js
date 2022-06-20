import React, { useEffect, useState } from 'react'

import './Dashboard.css'
import Gauges from './Gauges'


const Dashboard = () => {

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>
      <div id='chart-container'>
        <Gauges />
      </div>
    </div>
  )
}

export default Dashboard
