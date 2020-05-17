import React from 'react';
import Head from 'next/head'
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className={styles.header}>
          <h1 className={styles.header__title}>mogam.in</h1>
          <div className={styles.header__subTitle}>portfolio ni mierukedo Next.js sawaritakatta dake...</div>
          <img  className={styles.header__logo} src="/logo.svg" alt="logo" />
        </header>
      </main>
    </div>
  );
};
