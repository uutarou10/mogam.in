import React from 'react';
import HelmetBase from '../../components/HelmetBase'
import styled from 'styled-components';

const ProfileDlContainer = styled.dl`
  line-height: 1.8rem;
  dt {
    font-weight: bold;
    font-size: 1.1rem;
  }
`

export default ({data}) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <div className='section'>
      <HelmetBase pageTitle='About me' siteTitle={siteTitle} />
      <h2 className='is-size-3 has-text-weight-bold'>About me</h2>
      <hr />
      <h3 className='is-size-4 has-text-weight-bold'>Profile</h3>
      <p>雑に紹介</p>
      <div className='columns'>
        <div className='column'>
          がぞう
        </div>
        <div className='column has-text-centered'>
          <ProfileDlContainer>
            <dt>Handle</dt>
            <dd>ううたろ / モガミン</dd>
            <dt>Birthday</dt>
            <dd>February 2nd, 1997</dd>
            <dt>Location</dt>
            <dd>Yokohama, Kanagawa</dd>
          </ProfileDlContainer>
        </div>
      </div>

      <h3 className='is-size-4 has-text-weight-bold'>Skills</h3>
      <p>いろいろお勉強中…</p>

      <h3 className='is-size-4 has-text-weight-bold'>Accounts</h3>
      <p>アカウントたち</p>

      <h3 className='is-size-4 has-text-weight-bold'>Hobbies</h3>
      <p>割とどうでもいい話</p>
    </div>
  )
}

export const aboutQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`