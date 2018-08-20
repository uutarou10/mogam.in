import React from 'react'

export default ({accounts}) => {
  return (
    <div className='content'>
      <ul>
        {accounts.map(account => (
          <li key={account.name} className='has-text-weight-bold'>{account.name}<br/><a href={account.url} target='_blank' className='has-text-weight-normal'>{account.uid}</a></li>
        ))}
      </ul>
    </div>
  )
}