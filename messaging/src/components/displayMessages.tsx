import { Message as MessageType } from '@/types/message'
import React, { FC } from 'react'
import Message from './message'
import { Avatar, colors } from '@mui/material'

interface DisplayMessagesPropstypes {
  messages: MessageType[]
  userEmail: string
}

const DisplayMessages: FC<DisplayMessagesPropstypes> = ({ messages = [], userEmail }) => {
  
  return (
    <div className='flex flex-col-reverse gap-1'>
      {messages.map((msg, i) => {
        const isNewMsgSeries = (!messages[i + 1] || messages[i + 1].email !== msg.email)
        return (
          <div key={i} className={`flex gap-1
            ${userEmail === msg.email && 'flex-row-reverse'} ${isNewMsgSeries && 'mt-3'}
          `}>
            <Avatar
              src="/imagesource.jpg" //non-existent
              alt={msg.uname.toUpperCase()}
              className={`${!isNewMsgSeries && 'invisible'}`}
              sx={{ bgcolor: colors.deepOrange[500], }}
            />
            <Message {...{ msg, userEmail, isNewMsgSeries }} />
          </div>
        )
      })}
    </div>
  )
}

export default DisplayMessages