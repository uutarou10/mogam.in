import React from 'react'
import './common.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default ({location, children, data}) => {
  const title = data.site.siteMetadata.title
  return (
    <div>
      <Header title={title} />
      <main className='container'>
        {children()}
      </main>
      <Footer />
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
