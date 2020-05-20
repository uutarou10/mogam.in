import React from 'react';
import styles from './styles.module.scss';
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <a>
          <img className={styles.logo} src="/logo.svg" alt="logo" />
        </a>
      </Link>
      <Link href={"/about"}>
        <a className={styles.link}>😉 about me</a>
      </Link>
      <Link href={"/articles"}>
        <a className={styles.link}>📚 articles</a>
      </Link>
      <Link href={"/contact"}>
        <a className={styles.link}>📱 contact</a>
      </Link>
    </nav>
  );
};
