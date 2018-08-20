import React from 'react'
import Link from 'gatsby-link'

const isPathEqualToLocation = (path , location) => (location.pathname === path)

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            {/* <a className="navbar-item is-size-5 has-text-weight-bold">{title}</a> */}
            <span className={'navbar-burger burger' + (this.state.isOpen ? ' is-active' : '')} data-target="navbarMenuHeroA" onClick={this.toggleOpen}>
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className={'navbar-menu' + (this.state.isOpen ? ' is-active' : '')}>
            <div className="navbar-end">
              <Link to='/' className={'navbar-item' + (isPathEqualToLocation('/', this.props.location) ? ' is-active' : '')}>Top</Link>
              <Link to='/about' className={'navbar-item' + (isPathEqualToLocation('/about', this.props.location) ? ' is-active' : '')}>About</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}