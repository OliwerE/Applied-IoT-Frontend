import React from 'react'
import { Link } from 'react-router-dom'
import './Start.css'

const Start = () => {
  return (
    <div id='start' >
      <div>
        <Link className='link' to="/dashboard">Open Dashboard &#x2192;</Link>
      </div>
    </div>
  )
}

export default Start