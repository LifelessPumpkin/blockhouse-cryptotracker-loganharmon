import React from 'react'

export default function Button(props) {

    const {text} = props

  return (
    <button className='w-[50px] h-[70px] center'>
        {text}
    </button>
  )
}
