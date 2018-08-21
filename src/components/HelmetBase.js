import React from 'react';
import Helmet from 'react-helmet';

export default ({
  siteTitle,
  location,
  siteUrl,
  description='',
  pageTitle = ''
}) => {
  const title = pageTitle.length === 0 ? siteTitle : `${pageTitle} | ${siteTitle}`
  const pageDescription = description || 'アイドル好きのWebエンジニア見習いが日々の勉強で知ったことを書き溜めるブログ。'
  const ogType = location.pathname.startsWith('/posts') ? 'article' : 'website'

  return (
    <Helmet>
      <html lang='ja' />
      <title>{title}</title>
      <meta
        name='description'
        content={pageDescription}
      />

      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={siteUrl + location.pathname} />
      {/* <meta property="og:image" content=" サムネイル画像の URL" /> */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:description" content={pageDescription} />


    </Helmet>
  )
} 