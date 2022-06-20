import React from 'react'

const LineChart = ({ sensorName, sensorValues }) => {
  return (
    <div>
      <h1>{sensorName}</h1>
      {sensorValues.map(v => {
        return <p>time ago: {v.hoursAgo}, value: {v.value}</p>
      })}
    </div>
  )
}

export default LineChart