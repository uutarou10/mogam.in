import React from 'react';
import Head from 'next/head'
import styles from '../styles/home.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>mogam.in</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className={styles.container}>
        <main>

          <header className={styles.header}>
            <img className={styles.header__logo} src="/logo.svg" alt="logo"/>
            <h1 className={styles.header__title}>mogam.in</h1>
            <div className={styles.header__subTitle}>portfolio ni mierukedo Next.js sawaritakatta dake...</div>
          </header>

          <nav className={styles.navigation}>
            <Link href={"/about"}>
              <a className={styles.navigation__link}>😉 about me</a>
            </Link>
            <Link href={"/articles"}>
              <a className={styles.navigation__link}>📚 articles</a>
            </Link>
            <Link href={"/contact"}>
              <a className={styles.navigation__link}>📱 contact</a>
            </Link>
          </nav>
        </main>
      </div>
    </>
  )
    ;
};