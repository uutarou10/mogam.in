import React from 'react';
import HelmetBase from '../../components/HelmetBase'
import Profile from '../../components/About/Profile';
import Accounts from '../../components/About/Accounts';
import DescriptionList from '../../components/About/DescriptionList';
import styled from 'styled-components';
import Icon from './uutarou.jpg'

const FrameWrapper = styled.div`
  iframe {
    max-width: 100%;
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
      <p className='is-italic'>雑に紹介</p>
      <div className='columns'>
        <div className='column'>
          <figure
            className='image'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={Icon}
              alt='プロフィール画像'
              className='is-rounded'
              style={{
                width: '50%'
              }}
            />
          </figure>
        </div>
        <div
          className='column has-text-centered'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Profile profile={data.dataYaml.profile} />
        </div>
      </div>

      <h3 className='is-size-4 has-text-weight-bold'>Skills</h3>
      <p className='is-italic'>いろいろお勉強中…</p>
      <DescriptionList list={data.dataYaml.skills} />

      <h3 className='is-size-4 has-text-weight-bold'>Accounts</h3>
      <p className='is-italic'>アカウントたち</p>
      <Accounts accounts={data.dataYaml.accounts} />

      <h3 className='is-size-4 has-text-weight-bold'>Hobbies</h3>
      <p className='is-italic'>割とどうでもいい話</p>
      <DescriptionList list={data.dataYaml.hobbies} />

      <FrameWrapper>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/NypVvG9fQ7o" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p>▲でんぱ組を知ったきっかけとなった曲。</p>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/EGy39OMyHzw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p>▲イントロとテンポがたまらん。ライブで聴くとアガる。</p>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/qDrm8NfhgsU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p>▲7人体制初の夏曲。ライブで聴きたいですなぁ。</p>
      </FrameWrapper>
    </div>
  )
}

export const aboutQuery = graphql`
  query AboutQuery{
    site {
      siteMetadata {
        title
      }
    }
    dataYaml {
      profile {
        name
        desc
      }
      skills {
        name
        desc
      }
      accounts {
        name
        uid
        url
      }

      hobbies {
        name
        desc
      }
    }
  }
`