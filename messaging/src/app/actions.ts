'use server'
import { authInputs } from "@/types/auth";
import { message } from "@/types/message";
import { db } from "@/utils/db";
import { pusherServer } from "@/utils/socket";
import { cookies } from "next/headers";

export const addMessage =async (message : string) => {
  const timestamp = Date.now()
  const email  = cookies().get('ChatApp_email')?.value
  const {uname} = await db.get(`user:${email}`) as authInputs 

  if (!uname) return

  const chatSet : message = {uname ,message,timestamp}
  
  pusherServer.trigger('chat','new_chat',chatSet)

  await db.zadd('chats', {
    score: timestamp,
    member: JSON.stringify(chatSet),
  })

}

export const getMessages = async () : Promise<message[]> => {
  const messages = await db.zrange('chats', 0, -1) as message[]

  return messages
  
} 


export const getUser = async () => {
  return {
    email : cookies().get('ChatApp_email')?.value,
    uname : cookies().get('ChatApp_uname')?.value,
  }
}