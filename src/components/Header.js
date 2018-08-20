import React from 'react'
import Link from 'gatsby-link'
import Navbar from './Navbar';


const Header = ({location, title}) => {
  return (
    <header className='hero is-primary'>
      <div className='hero-head'>
        <Navbar location={location}/>
      </div>
      <div className='hero-body has-text-centered'>
        <div className='container'>
          <h1 className='title'><Link to='/'>{title}</Link></h1>
        </div>
      </div>
    </header>
  )
}

export default Header;