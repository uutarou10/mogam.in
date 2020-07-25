import React from 'react';
import Head from "next/head";
import {Navbar} from "../../components/Navbar";
import {PageHeader} from "../../components/PageHeader";
import styles from '../../styles/articles.module.scss';
import {GetStaticProps, InferGetStaticPropsType} from "next";
import Parser from 'rss-parser';
import dayjs from 'dayjs';

export default ({articles}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedMedia, setSelectedMedia] = React.useState<MediaType | 'all'>('all');
  return (
    <>
      <Head>
        <title>articles | mogam.in</title>
      </Head>

      <Navbar/>
      <div className={styles.pageHeader}>
        <PageHeader title={"articles"}/>
      </div>
      <main>
        <div className={styles.mediaSelector}>
          <div className={selectedMedia === 'all' ? styles["mediaSelector__item-active"] : styles.mediaSelector__item} onClick={() => setSelectedMedia('all')}>すべて</div>
          <div className={selectedMedia === 'blog' ? styles["mediaSelector__item-active"] : styles.mediaSelector__item} onClick={() => setSelectedMedia('blog')}>ブログ</div>
          <div className={selectedMedia === 'qiita' ? styles["mediaSelector__item-active"] : styles.mediaSelector__item} onClick={() => setSelectedMedia('qiita')}>Qiita</div>
          <div  className={selectedMedia === 'note' ? styles["mediaSelector__item-active"] : styles.mediaSelector__item} onClick={() => setSelectedMedia('note')}>note</div>
        </div>
        <hr className={styles.separator} />
        {articles.filter(article => selectedMedia === 'all' ? true : article.media === selectedMedia).map(item => (
          <article className={styles.article}>
            <a className={styles.article__title} href={item.url} target="_blank" rel="noopener"><h2>{item.title}</h2></a>
            <div className={styles.article__metadata}>{dayjs(item.date).format('YYYY-MM-DD')} from {item.media}</div>
            <div className={styles.article__body}>{item.content}</div>
          </article>
        ))}
      </main>
    </>
  );
};

type MediaType = 'qiita' | 'blog' | 'note';

interface Article {
  title: string;
  url: string;
  content: string;
  date: number;
  media: MediaType;
}

export const getStaticProps: GetStaticProps<{articles: Article[]}> = async () => {
  const parser = new Parser();
  const [qiitaOutput, blogOutput, noteOutput] = await Promise.all([
    parser.parseURL('https://qiita.com/mogamin3/feed.atom'),
    parser.parseURL('https://yurufuwa-tech.hatenablog.com/rss'),
    parser.parseURL('https://note.com/uutarou/rss')
  ]);

  return {
    props: {
      articles: [
        ...convParserItemsToArticles(qiitaOutput.items, 'qiita'),
        ...convParserItemsToArticles(blogOutput.items, 'blog'),
        ...convParserItemsToArticles(noteOutput.items, 'note')
      ].sort((a, b) => b.date - a.date)
    }
  };
};

const convParserItemsToArticles = (parserItems: Parser.Item[], media: MediaType): Article[] => {
  const contentFromRawContent = rawText =>  rawText.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 300) + (rawText.length > 300 ? '...' : '');

  return parserItems.map(item => ({
    title: item.title ?? '',
    url: item.link ?? '',
    content: contentFromRawContent(item.content),
    date: item.pubDate ? new Date(item.pubDate).getTime() : 0,
    media
  }));
};
