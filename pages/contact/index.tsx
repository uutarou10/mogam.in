import React from 'react';
import Head from "next/head";
import {Navbar} from "../../components/Navbar";
import styles from "../../styles/contact.module.scss";
import {PageHeader} from "../../components/PageHeader";
import axios from 'axios';
import {Layout} from "../../components/Layout";

export default () => {
  const {
    name,
    email,
    content,
    isSending,
    onChangeName,
    onChangeEmail,
    onChangeContent,
    isValid,
    onSubmit
  } = useContactFormState();

  return (
      <Layout pageTitle="contact">
        <div className={styles.hintText}>
          <p>ご連絡は以下のフォームまたは<a href="https://twitter.com/mogamin3" target="_blank" rel="noopener">Twitter</a>のDMよりお願いいたします。</p>
        </div>

        <div>
          <form className={styles.contactForm} onSubmit={(e: React.FormEvent) => {e.preventDefault(); onSubmit();}}>
            <div className={styles["contactForm__fieldContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="name">📛 お名前</label>
              <input id="name" className={styles["contactForm__input"]} required={true} value={name} onChange={onChangeName} />
            </div>
            <div className={styles["contactForm__fieldContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="email">📩 メールアドレス</label>
              <input id="email" inputMode="email" className={styles["contactForm__input"]} required={true} type="email" value={email} onChange={onChangeEmail} />
            </div>
            <div className={styles["contactForm__fieldContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="content">✒️ 本文(400字まで)</label>
              <textarea id="content" className={styles["contactForm__textarea"]} required={true} value={content} onChange={onChangeContent} />
            </div>
            <div className={styles["contactForm__buttonContainer"]}>
              <button className={styles["contactForm__button"]} type="submit" disabled={!isValid || isSending}>{isSending ? '送信中...' : '送信'}</button>
            </div>
          </form>
        </div>
      </Layout>
  );
};

const useContactFormState = () => {
  type Action = {type: 'inputName' | 'inputEmail' | 'inputContent', input: string} | {type: 'reset' | 'startSend' | 'doneSend'};

  const initialState = {
    name: '',
    email: '',
    content: '',
    isSending: false
  };

  const reducer = (state: typeof initialState, action: Action): typeof initialState => {
    switch (action.type) {
      case 'inputName': {
        return {
          ...state,
          name: action.input
        };
      }

      case 'inputEmail': {
        return {
          ...state,
          email: action.input
        };
      }

      case 'inputContent': {
        return {
          ...state,
          content: action.input
        };
      }

      case 'startSend': {
        return {
          ...state,
          isSending: true
        };
      }

      case 'doneSend': {
        return {
          ...state,
          isSending: false
        }
      }

      case 'reset': {
        return initialState;
      }
    }
  };

  const [state, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const emailRegex = /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/;

  const isValidName = state.name.trim().length > 0;
  const isValidEmail = emailRegex.test(state.email.trim());
  const isValidContent = state.content.trim().length > 0 && state.content.trim().length <= 400;

  const isValidForm = isValidName && isValidEmail && isValidContent;
  const onChangeName = (changeEvent: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'inputName', input: changeEvent.target.value});
  const onChangeEmail = (changeEvent: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'inputEmail', input: changeEvent.target.value});
  const onChangeContent = (changeEvent: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({type: 'inputContent', input: changeEvent.target.value});
  const onSubmit = async () => {
    try {
      dispatch({type: 'startSend'});
      await axios.post('https://us-central1-mogamin-playground.cloudfunctions.net/sendContact', {
        name: state.name.trim(),
        email: state.email.trim(),
        content: state.content.trim()
      });
      alert('送信しました。返信が必要と判断したものに関してはこちらよりご連絡いたします。');
      dispatch({type: 'reset'});
    } catch (e) {
      alert('申し訳ありません。送信できませんでした。\n再度お試しください。');
      return;
    } finally {
      dispatch({type: 'doneSend'});
    }
  }

  return {
    ...state,
    isValid: isValidForm,
    onChangeName,
    onChangeEmail,
    onChangeContent,
    onSubmit
  };
}
