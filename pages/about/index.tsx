import React from 'react';
import Head from "next/head";
import {Navbar} from "../../components/Navbar";
import {PageHeader} from "../../components/PageHeader";
import styles from '../../styles/about.module.scss';

export default () => {
  return (
    <>
      <Head>
        <title>about me | mogam.in</title>
      </Head>

      <Navbar/>
      <div className={styles.pageHeader}>
        <PageHeader title={"about me"}/>
      </div>
      <main className={styles.main}>
        <div className={styles.profilePic}>
          <img src="/profile.png" alt="profile photo"/>
        </div>
        <article className={styles.article}>
          {profileSections.map(renderProfileSection)}
        </article>
      </main>
    </>
  );
};

interface ProfileSection {
  title: string,
  paragraphs: string[]
}

const renderProfileSection = ({title, paragraphs}: ProfileSection, key?: number) => {
  const renderParagraphs = () => (
    paragraphs.map((text, i) => <p
      key={i}>{text.split('\n').map((text, i, originalArray) => originalArray.length - 1 === i ? text :
      <React.Fragment key={i}>{text}<br/></React.Fragment>)}</p>)
  );

  return (
    <div key={key} className={styles.profileSection}>
      <h2>{title}</h2>
      <div>
        {renderParagraphs()}
      </div>
    </div>
  );
};


const profileSections: ProfileSection[] = [
  {title: '✨ Name', paragraphs: ['のなか こうた', '会社ではわけあって「もがみん」と呼ばれています。\nこのサイトのドメインの由来もあだ名からきています。']},
  {title: '🗾 Location', paragraphs: ['東京都']},
  {title: '🏛 History', paragraphs: ['1997年2月生まれ。\n2015年4月に東京工科大学コンピュータサイエンス学部入学。\n2019年3月に大学卒業後、Fringe81株式会社へ新卒入社。']},
  {
    title: '💪 Skills',
    paragraphs: ['JavaScript/TypeScript/React/React Nativeが好きで、フロントエンドを生業としています。仕事では主にTypeScriptを使ってReact Nativeアプリの開発、たまにElmを書きます。', '最近はdenoに興味津々。']
  },
  {title: '😍 Hobbies', paragraphs: ['カメラ/バイク/ドライブ/ガジェットへの散財などなど多趣味です。\n広く浅いタイプ。']}
];
