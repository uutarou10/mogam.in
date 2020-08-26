import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const Meta = () => {
  const router = useRouter();

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mogam.in${router.pathname}`} />
      <meta property="og:image" content={`https://mogam.in/ogp.png`} />
      <meta property="og:site_name" content="mogam.in" />
      <meta
        property="og:description"
        content="多趣味な都内のITエンジニアのポートフォリオサイトです。"
      />
      <meta property="fb:app_id" content="3208244659289571" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  );
};
