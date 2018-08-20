import React from 'react';
import Helmet from 'react-helmet';

export default ({siteTitle, pageTitle = ''}) => {
  return (
    <Helmet title={pageTitle.length === 0 ? siteTitle : `${pageTitle} | ${siteTitle}`} />
  )
} 