import { message } from '@/types/message'
import React, { FC } from 'react'
import Message from './message'

interface propstypes {
  messages: message[]
  uname: string
}

const DisplayMessages: FC<propstypes> = ({ messages = [], uname }) => {
  return (
    <div className='flex flex-col-reverse gap-1'>
      {messages.map((msg, i) => <Message key={i} {...{msg,uname}}/>)}
    </div>
  )
}

export default DisplayMessages