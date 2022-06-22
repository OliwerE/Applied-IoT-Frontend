import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'

const LineCharts = () => {
  const [sensorsAvg, setSensorsAvg] = useState({})

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensors/avg/hour/all`).then(res => {
      return res.json()
    }).then(json => {
      setSensorsAvg(json.sensors)
    }).catch(err => {
      console.error(err)
    })
  },[])

  return (
    <>
      {Object.keys(sensorsAvg).map(sensor => {        
        return <LineChart sensorName={sensor} sensorValues={sensorsAvg[sensor]} />
      })}
    </>
  )
}

export default LineCharts