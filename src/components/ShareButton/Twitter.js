import React from 'react';

export default class Twitter extends React.Component {
  componentDidMount() {
    twttr.widgets.load(this.refs.tweetButton)
  }
  
  render() {
    return (
      <a ref='tweetButton'
        href='https://twitter.com/share'
        className='twitter-share-button'
        data-show-count='false'
        data-size='large'
      >Tweet</a>    
    )
  }
}