import { Message } from '@/types/message'
import { formatTime } from '@/utils/functions'
import { Box, Color, colors } from '@mui/material'
import React, { FC } from 'react'

interface MessagePropstypes {
  userEmail: string
  msg: Message
  isNewMsgSeries: boolean
}

const Message: FC<MessagePropstypes> = ({ userEmail, msg, isNewMsgSeries }) => {

  return (
    <div
      className={`flex flex-col pt-2 px-3 w-max max-w-[70%] text-wrap break-words rounded-lg 
            ${userEmail === msg.email
          ? ' bg-green-200 : first-of-type:rounded-br-none'
          : ' bg-gray-300 first-of-type:rounded-bl-none'}
            `}
    >
      {isNewMsgSeries &&
        <Box className={`text-sm -mt-1 mb-1 font-semibold text-zinc-500`} >
          ~{msg.email === userEmail ? 'You' : msg.uname}
        </Box>
      }
      <div className={``}>
        {msg.message}
      </div>
      <div className={`flex mt-1 -mr-2 h-min text-[0.6rem] bg-clip-text text-gray-600 self-end `}>
        {formatTime(msg.timestamp)}
      </div>

    </div>
  )
}

export default Message