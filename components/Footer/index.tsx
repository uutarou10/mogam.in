import React from "react";
import styles from './footer.module.scss';
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <p>©︎ 2020 Kota Nonaka<br/><Link href={"/policy"}><a>Privacy policy</a></Link></p>
    </footer>
  )
}
