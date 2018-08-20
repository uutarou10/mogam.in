import React from 'react'

export default ({list}) => {
  return (
    <div className='content'>
      <ul>
        {list.map(obj => (
          <li key={obj.name} className='has-text-weight-bold'>
            {obj.name}
            <ul>
              <li className='has-text-weight-normal'>{obj.desc}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}