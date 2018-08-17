import React from 'react';

export default ({list}) => {
  return list === null ? null : (
    <ul className='tags is-marginless'>
      {(list || []).map((tag, index) => (
        <li key={index} className='tag is-rounded is-primary'>{tag}</li>
      ))}
    </ul>
  )
}