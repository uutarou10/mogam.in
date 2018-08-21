import React from 'react'
import styled from 'styled-components'
import Twitter from './Twitter'
import Hatena from './Hatena'

const Wrapper = styled.div`
  iframe {
    margin-right: 8px;
  }
`

export default () => {
  return (
    <Wrapper>
      <Twitter text={window.document.title} />
      <Hatena />
    </Wrapper>
  )
}