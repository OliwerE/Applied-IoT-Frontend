import React, { useState, useEffect } from 'react'
import GaugeChart from 'react-gauge-chart'

import './Gauge.css'

const Gauge = ({ sensor }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [gaugePercentage, setGaugePercentage] = useState(0)
  const [arcsLength, setArcsLength] = useState([])
  const [arcsColors, setArcsColors] = useState([])
  
  useEffect(() => {
    handleCalculateGaugePercentage()
    handleArcsLength()
    handleArcsColors()
    setHasLoaded(true)
  }, [])

  const handleCalculateGaugePercentage = () => {
    switch(sensor.sensorName) {
      case 'temperature':
        setGaugePercentage(sensor.value / 50) // 0-50°C
        break;
      case 'humidity':
        setGaugePercentage(sensor.value / 100)
        break;
      case 'heat-index':
        setGaugePercentage(sensor.value / 50)  // 0-50°C
        break;
      case 'air-pressure':
        setGaugePercentage((sensor.value - 87000) / 21480) // min = 87000, max = 108480 (lowest/highest ever recorded)
        break;
      case 'air-quality':
        setGaugePercentage(sensor.value / 500)
        break;
      default:
        setGaugePercentage(0)
    }
  }

  const handleArcsLength = () => {
    switch(sensor.sensorName) {
      case 'temperature':
        setArcsLength([0.36, 0.16, 0.48])
        break;
      case 'humidity':
        setArcsLength([0.2, 0.4, 0.4])
        break;
      case 'heat-index':
        setArcsLength([0.36, 0.16, 0.48])
        break;
      case 'air-pressure':
        setArcsLength([0.6052141527001862, 0.0616852886, 0.333100559])
        break;
      case 'air-quality':
        setArcsLength([0.4, 0.4, 0.2])
        break;
      default:
        setGaugePercentage(0)
    }
  }

  const handleArcsColors = () => {
    switch(sensor.sensorName) {
      case 'temperature':
        setArcsColors(['#4682b4', '#5BE12C', '#EA4228'])
        break;
      case 'humidity':
        setArcsColors(['#F5CD19', '#5BE12C', '#EA4228'])
        break;
      case 'heat-index':
        setArcsColors(['#4682b4', '#5BE12C', '#EA4228'])
        break;
      case 'air-pressure':
        setArcsColors(['#F5CD19', '#5BE12C', '#EA4228'])
        break;
      case 'air-quality':
        setArcsColors(['#5BE12C', '#F5CD19', '#EA4228'])
        break;
      default:
        setArcsColors(['#5BE12C', '#F5CD19', '#EA4228'])
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
      case 'air-pressure':
        text = `${(sensor.value / 1000).toFixed(2)} kPa`
        break;
      case 'air-quality':
        text = `VOC Index: ${sensor.value}`
        break;
      default:
        text = sensor.value
    }
    return text
  }

  const handleGaugeTitle = () => {
    let title = sensor.sensorName
    title = title.replace('-', ' ')
    title = title.charAt(0).toUpperCase() + title.slice(1)
    return title
  }

  return (
    <div className='gauge'>
      <h1>{handleGaugeTitle()}</h1>
      {hasLoaded ? <GaugeChart
        id="gauge-chart"
        nrOfLevels={100}
        arcsLength={arcsLength}
        colors={arcsColors}
        percent={gaugePercentage}
        arcPadding={0.02}
        needleColor='#9f9f9f'
        needleBaseColor='#000'
        textColor='#fff'
        formatTextValue={handleGaugeTextValue}
      /> : null}
    </div>
  )
}

export default Gauge