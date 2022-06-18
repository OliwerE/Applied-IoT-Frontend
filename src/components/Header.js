import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div id="header">
      <h1>IoT Dashboard</h1>
      <nav>
        <ul>
          <li><Link className='link' to="/">Start</Link></li>
          <li><Link className='link' to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header