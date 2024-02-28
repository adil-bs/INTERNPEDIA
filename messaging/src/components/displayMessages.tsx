import { message } from '@/types/message'
import { formatTime } from '@/utils/functions'
import React, { FC } from 'react'

interface propstypes {
  messages: message[]
  user: string
}

const DisplayMessages: FC<propstypes> = ({ messages, user }) => {
  return (
    <div className='flex flex-col-reverse gap-1 '>
      {messages.map((msg, i) => (
        <div
          className={`flex flex-col p-2 text-wrap w-max max-w-[80%]  rounded-2xl 
            ${user === msg.uname
              ? ' self-end bg-green-300 first-of-type:rounded-br-none'
              : 'bg-gray-300 first-of-type:rounded-bl-none'}
            `}
          key={i}
        >
          <div className='mr-14'>
            {msg.message}
          </div>
          <div className='flex self-end h-min text-[0.7rem] bg-clip-text text-gray-600 '>
            {formatTime(msg.timestamp)}
          </div>
          {/* <div className='flex justify-end text-[0.7rem] text-gray-600 mt-1'>
          </div> */}

        </div>
      ))}
    </div>
  )
}

export default DisplayMessages