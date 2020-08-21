import React from 'react';
import {AppProps} from "next/app";
import 'normalize.css/normalize.css';
import '../styles/index.scss';
import styles from '../styles/app.module.scss';
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;500;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div className={styles.pageWrap}>
        <Component {...pageProps} />
      </div>
    </>
    );
};

export default App;
