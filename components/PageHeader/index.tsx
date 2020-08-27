import React from 'react';
import styles from './styles.module.scss';

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.text}>{title}</h1>
      </header>
    </div>
  );
};
