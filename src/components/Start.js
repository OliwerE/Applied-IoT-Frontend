import React from 'react'
import { Link } from 'react-router-dom'
import './Start.css'

const Start = () => {
  return (
    <div id='start' >
      <div>
        <Link className='link' to="/dashboard">Open Dashboard</Link>
      </div>
    </div>
  )
}

export default Start