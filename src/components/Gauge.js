import React, { useState, useEffect } from 'react'
import GaugeChart from 'react-gauge-chart'

import './Gauge.css'

const Gauge = ({ sensor }) => {
  const [gaugePercentage, setGaugePercentage] = useState(0)
  
  useEffect(() => {
    handleCalculateGaugePercentage()
  }, [])

  const handleCalculateGaugePercentage = () => {
    switch(sensor.sensorName) {
      case 'temperature':
        setGaugePercentage(sensor.value / 100)
        break;
      case 'humidity':
        setGaugePercentage(sensor.value / 100)
        break;
      case 'heat-index':
        setGaugePercentage(sensor.value / 100)
        break;
      case 'atmospheric-pressure':
        setGaugePercentage((sensor.value - 87000) / 21480) // min = 87000, max = 108480 (lowest/highest ever recorded)
        break;
      case 'air-quality':
        setGaugePercentage(sensor.value / 500)
        break;
      default:
        setGaugePercentage(0)
    }
  }

  const handleGaugeTextValue = () => {
    let text
    switch(sensor.sensorName) {
      case 'temperature':
        text = `${sensor.value.toFixed(2)}°C`
        break;
      case 'humidity':
        text = `${sensor.value}%`
        break;
      case 'heat-index':
        text = `${sensor.value.toFixed(2)}°C`
        break;
      case 'atmospheric-pressure':
        text = `${sensor.value} Pa`
        break;
      case 'air-quality':
        text = `VOC Index: ${sensor.value}`
        break;
      default:
        text = sensor.value
    }
    return text
  }

  return (
    <div className='gauge'>
      <h1>{sensor.sensorName.replace('-', ' ')}</h1>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={100}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={['#5BE12C', '#F5CD19', '#EA4228']}
        percent={gaugePercentage}
        arcPadding={0.02}
        needleColor='#9f9f9f'
        needleBaseColor='#000'
        textColor='#fff'
        formatTextValue={handleGaugeTextValue}
      />
    </div>
  )
}

export default Gauge