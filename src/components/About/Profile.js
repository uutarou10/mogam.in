import React from 'react'
import styled from 'styled-components';

const ProfileDlContainer = styled.dl`
  line-height: 1.8rem;
  dt {
    font-weight: bold;
    font-size: 1.1rem;
  }
`

export default ({profile}) => {
  return (
    <ProfileDlContainer>
      {profile.map(obj => (
        <div>
          <dt>{obj.name}</dt>
          <dd>{obj.desc}</dd>
        </div>
      ))}
    </ProfileDlContainer>
  )
}