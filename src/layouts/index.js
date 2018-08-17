import React from 'react'
import './common.scss'
import Header from './header'

export default ({location, children, data}) => {
  const title = data.site.siteMetadata.title
  return (
    <div>
      <Header title={title} />
      <main className='container'>
        {children()}
      </main>
    </div>
  )
}

export const query = graphql`
  query LayoutQuery{
    site {
      siteMetadata {
        title
      }
    }
  }
`
