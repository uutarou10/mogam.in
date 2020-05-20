import React from 'react';
import Head from "next/head";
import {Navbar} from "../../components/Navbar";
import {PageHeader} from "../../components/PageHeader";

export default () => {
  return (
    <>
      <Head>
        <title>about me | mogam.in</title>
      </Head>

      <Navbar />
      <PageHeader title={"about me"} />
      <main>
        ここにかくよ。のなかだよ。
      </main>
    </>
  )
}
