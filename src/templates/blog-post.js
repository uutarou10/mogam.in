import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Tags from '../components/Tags';
import HelmetBase from '../components/HelmetBase'
import ShareButton from '../components/ShareButton';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div className='section'>
        <HelmetBase siteTitle={siteTitle} pageTitle={post.frontmatter.title} />
        <h2 className='is-size-3 has-text-weight-bold'>{post.frontmatter.title}</h2>
        <p>{post.frontmatter.date}</p>
        <Tags list={post.frontmatter.tags} />
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.html }} className='content' />
        <hr />
        <ShareButton />
        <ul className='columns is-mobile'>
          {previous && (
            <li className='column has-text-left'>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li className='column has-text-right'>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        tags
      }
    }
  }
`
