'use client'
import { Adjust, Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import DisplayMessages from "@/components/displayMessages";
import { message } from "@/types/message";
import { addMessage, getMessages, getUser } from "@/app/actions";
import { pusherClient } from "@/utils/socket";

export default function Home() {
  const endOfchatRef = useRef<HTMLDivElement>(null)
  const [userMessage, setUserMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<message[]>([])
  const [uname, setUname] = useState<string>('')

  const newMessageHandler = (newMsg: message) => {
    setMessages(prev => [newMsg, ...prev])
    if (endOfchatRef.current)
      endOfchatRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  
  useEffect(() => {
    
    pusherClient.subscribe('chat')
    pusherClient.bind('new_chat', newMessageHandler)
    
    const initializeMessagesAndUser = async () => {
      setUname((await getUser()).uname!)

      const rawMessages = await getMessages()
      setMessages(rawMessages.reverse())
      if (endOfchatRef.current)
        endOfchatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    initializeMessagesAndUser()

    return () => {
      pusherClient.unsubscribe('chat')
      pusherClient.unbind('new_chat', newMessageHandler)
    }
  }, [])

  const handleSubmit = (submit: boolean, e?: KeyboardEvent<HTMLDivElement>) => {
    if (submit || (e?.key === 'Enter' && !e?.shiftKey && userMessage)) {
      setLoading(true)
      addMessage(userMessage)
        .finally(() => setLoading(false))
      setUserMessage('')
    }
  }

  return (
    uname && 
    <div className="flex h-screen justify-center ">
      <div className="flex flex-col h-screen w-full p-2 sm:w-5/6 md:w-4/6 bg-slate-400">
        <div className=" self-start font-semibold text-2xl text-white w-full border-2 bg-gradient-to-br from-green-800 via-emerald-500 to-teal-200 ring-4 p-5 rounded-lg">
          GLOBAL CHAT
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-clip py-4 px-2 customscroll">
          <DisplayMessages messages={messages} uname={uname} />
          <div ref={endOfchatRef} />
        </div>

        <div className="ring-2 w-full  rounded-lg bg-white hover:ring-4 ">
          <TextField
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            multiline
            fullWidth
            placeholder="Message everyone..."
            minRows={3}
            onKeyDown={e => handleSubmit(false, e)}
            InputProps={{
              endAdornment:
                <IconButton disabled={loading} onClick={() => handleSubmit(true)} sx={{ alignSelf: 'flex-end', }}>
                  <div className=" border-2 p-1 rounded-md cursor-pointer border-green-300 hover:ring-2 ">
                    {loading ? <Adjust color="disabled" /> : <Send color="primary" />}
                  </div>
                </IconButton>
            }}
          />
        </div>
      </div>
    </div>
  )
}
