import React from 'react'
import Link from 'gatsby-link'

const isPathEqualToLocation = (path , location) => (location.pathname === path)

const Header = ({location, title}) => {
  return (
    <header className='hero is-primary'>
      <div className='hero-head'>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              {/* <a className="navbar-item is-size-5 has-text-weight-bold">{title}</a> */}
              <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <Link to='/' className={'navbar-item' + (isPathEqualToLocation('/', location) ? ' is-active' : '')}>Top</Link>
                <Link to='/about' className={'navbar-item' + (isPathEqualToLocation('/about', location) ? ' is-active' : '')}>About</Link>
              </div>
            </div>
          </div>
        </nav>
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