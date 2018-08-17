import React from 'react'
import Link from 'gatsby-link'

const Header = ({title}) => {
  return (
    <header className='hero is-primary'>
      <div className='hero-body has-text-centered'>
        <div className='container'>
          <h1 className='title'><Link to='/'>{title}</Link></h1>
        </div>
      </div>
    </header>
  )
}

export default Header;