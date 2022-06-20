import React, { useEffect, useState } from 'react'
import Gauge from './Gauge'

const Gauges = () => {
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/sensors`).then(res => {
      return res.json()
    }).then(json => {
      setSensors(json.sensors)
    }).catch(err => {
      console.error(err)
    })
  },[])

  return (
    <>
      {sensors.map(sensor => {
        return <Gauge sensor={sensor} />
      })}
    </>
  )
}

export default Gauges