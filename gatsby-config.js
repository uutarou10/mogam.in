module.exports = {
  siteMetadata: {
    title: "Mogami#Log",
    siteUrl: process.env.SITE_URL || 'https://mogam.in'
  },
  plugins: [
    /* ---------- Post ---------- */ 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },

    /* ---------- About page ---------- */ 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: "data",
      },
    },
    'gatsby-transformer-yaml',

    /* ---------- Style ---------- */ 
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',

    /* ---------- Others ---------- */ 
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-109873847-2`,
      },
    },
    `gatsby-plugin-react-helmet`,

    /* ---------- PWA ---------- */ 
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mogami#Log`,
        short_name: `Mogami#Log`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#00D1B2`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`,
  ],
}
