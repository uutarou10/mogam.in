import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Tags from '../components/Tags'
import HelmetBase from '../components/HelmetBase';


class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div className='section'>
        <HelmetBase
          siteTitle={siteTitle}
          location={this.props.location}
        />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <article key={node.fields.slug} className='box'>
              <h2 className='is-size-5 has-text-weight-bold'>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <small>{node.frontmatter.date}</small>
              <Tags list={node.frontmatter.tags} />
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </article>
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            tags
          }
        }
      }
    }
  }
`
