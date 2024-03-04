'use client'
import { Adjust, Send } from "@mui/icons-material";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import DisplayMessages from "@/components/displayMessages";
import { Message } from "@/types/message";
import { pusherClient } from "@/utils/socket";
import { addMessage, getMessages } from "@/app/actions/chat";
import { UserDataContext } from "@/components/context";
import { Friend } from "@/types/friends";
import { notFound, usePathname } from "next/navigation";

interface ChatPageProps{
  params : {chatpartner : string}
  searchParams : object
}
export default function Page({params} : ChatPageProps) {  
  const chatpartner = decodeURIComponent(params.chatpartner)
  const [userMessage, setUserMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<{messages:Message[],friend:Friend}>()
  const userData = useContext(UserDataContext)
  const pathname = usePathname()

  const newMessageHandler = (newMsg: Message) => {
    setMessages(prev => ({
      ...prev!,
      messages :[newMsg, ...prev!.messages],
    }))
  }


  useEffect(() => {
    if (pathname === '/dashboard/chat/globalchat'){
      pusherClient.subscribe('chat_globalchat')
    }else {
      pusherClient.subscribe(`chat_${userData!.userEmail}-${chatpartner}`)
    }
    pusherClient.bind('new_chat', newMessageHandler)

    getMessages(chatpartner)
      .then(({messages,friend}) => setMessages({
        messages:messages.reverse(),
        friend,
      }))

    return () => {
      pusherClient.unbind('new_chat', newMessageHandler)
      if (pathname === '/dashboard/chat/globalchat'){
        pusherClient.unsubscribe('chat_globalchat')
      }else {
        pusherClient.unsubscribe(`chat_${userData!.userEmail}-${chatpartner}`)
      }
  }
  }, [])

  const handleSubmit = (submit: boolean, e?: KeyboardEvent<HTMLDivElement>) => {
    if (submit || (e?.key === 'Enter' && !e?.shiftKey && userMessage)) {
      setLoading(true)
      addMessage(userMessage, messages!.friend.email)
        .finally(() => setLoading(false))
      setUserMessage('')
    }
  }

  return (
    // userData?.userEmail &&
    <div className="flex flex-1 flex-col h-screen max-sm:w-full p-2  bg-slate-400 overflow-clip">

      <div className=" self-start font-semibold text-2xl text-white w-full border-2 bg-gradient-to-br from-green-800 via-emerald-500 to-teal-200 ring-4 p-5 rounded-lg">

        <div className="flex flex-col gap-1">
          <p>{messages?.friend.uname}</p>
          <p className="text-sm ">{chatpartner==='globalchat' ?'Talk to everyone':chatpartner}</p>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto flex flex-col-reverse overflow-x-clip pb-4 customscroll">
        <DisplayMessages messages={messages?.messages} userEmail={userData!.userEmail} />
      </div>

      <div className="ring-2 w-full  rounded-lg bg-white hover:ring-4 ">
        <TextField
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          multiline
          fullWidth
          placeholder={`Message ${messages?.friend.uname}...`}
          minRows={3}
          onKeyDown={e => handleSubmit(false, e)}
          InputProps={{
            endAdornment:
              <Tooltip title='send'>
                <IconButton disabled={loading} onClick={() => handleSubmit(true)} sx={{ alignSelf: 'flex-end', }}>
                  <div className=" border-2 p-1 rounded-md cursor-pointer border-green-300 hover:ring-2 ">
                    {loading ? <Adjust color="disabled" /> : <Send color="primary" />}
                  </div>
                </IconButton>
              </Tooltip>
          }}
        />
      </div>
    </div>
  )
}
