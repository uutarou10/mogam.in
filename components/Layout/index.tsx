import React from 'react';
import styles from './layout.module.scss';
import Head from 'next/head';
import { Navbar } from '../Navbar';
import { PageHeader } from '../PageHeader';
import { Footer } from '../Footer';
import { Meta } from '../Meta';

interface Props {
  pageTitle: string;
  children: React.ReactNode;
}

export const Layout = ({ pageTitle, children }: Props) => {
  return (
    <>
      <Meta />
      <Head>
        <title>{pageTitle} | mogam.in</title>
        <meta property="og:title" content={pageTitle} />
      </Head>

      <div className={styles.navBarContainer}>
        <Navbar />
      </div>
      <div className={styles.pageHeader}>
        <PageHeader title={pageTitle} />
      </div>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};
