import React from 'react';
import styles from './layout.module.scss';
import Head from "next/head";
import {Navbar} from "../Navbar";
import {PageHeader} from "../PageHeader";

interface Props {
  pageTitle: string;
  children: React.ReactNode
}

export const Layout = ({pageTitle, children}: Props) => {
  return (
    <>
      <Head>
        <title>{pageTitle} | mogam.in</title>
      </Head>

      <div className={styles.navBarContainer}>
        <Navbar/>
      </div>
      <div className={styles.pageHeader}>
        <PageHeader title={pageTitle}/>
      </div>
      <main>{children}</main>
    </>
  );
}
