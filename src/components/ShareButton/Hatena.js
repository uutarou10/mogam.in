import React from 'react';

export default () => {
  return (
    <a
      href="http://b.hatena.ne.jp/entry/"
      className="hatena-bookmark-button"
      data-hatena-bookmark-layout="basic-label"
      data-hatena-bookmark-lang="ja"
      data-hatena-bookmark-height="28"
      title="このエントリーをはてなブックマークに追加"
    ><img
        src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
        alt="このエントリーをはてなブックマークに追加"
        width="28"
        height="76"
        style={{border: 'none'}}
      />
    </a> 
  )
}