import { message } from '@/types/message'
import { formatTime } from '@/utils/functions'
import React, { FC } from 'react'

interface propstypes {
  uname: string
  msg: message
}

const Message: FC<propstypes> = ({ uname, msg }) => {
  return (
    <div
      className={`flex flex-col p-2 px-3 text-wrap w-max max-w-[80%] rounded-2xl 
            ${uname === msg.uname
          ? ' self-end bg-green-300 : first-of-type:rounded-br-none'
          : ' bg-gray-300 first-of-type:rounded-bl-none'}
            `}
    >
      <div>
        {}
      </div>
      <div className={`
            ${uname === msg.uname ? 'ml-14' : 'mr-14'}`}
      >
        {msg.message}
      </div>
      <div className={`flex h-min -mt-3 text-[0.7rem] bg-clip-text text-gray-600
            ${uname === msg.uname ? 'self-start -ml-1' : 'self-end -mr-1'} `}
      >
        {formatTime(msg.timestamp)}
      </div>

    </div>
  )
}

export default Message