'use server'
import { authInputs } from "@/types/auth";
import { Message } from "@/types/message";
import { db } from "@/utils/db";
import { pusherServer } from "@/utils/socket";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const addMessage =async (message : string) => {
  const timestamp = Date.now()
  const email  = cookies().get('ChatApp_email')?.value
  const {uname} = await db.get(`user:${email}`) as authInputs 

  if (!uname || !email) return

  const chatSet : Message = {email, uname ,message,timestamp}
  
  pusherServer.trigger('chat','new_chat',chatSet)

  await db.zadd('chats', {
    score: timestamp,
    member: JSON.stringify(chatSet),
  })

}

export const getMessages = async () : Promise<Message[]> => {
  const messages = await db.zrange('chats', 0, -1) as Message[]
  return messages 
} 


export const getUser = async () => {
  return {
    email : cookies().get('ChatApp_email')?.value,
    uname : cookies().get('ChatApp_uname')?.value,
  }
}

export const logout = async () => {
  cookies().delete('ChatApp_email')
  cookies().delete('ChatApp_uname')
  // redirect('/auths',RedirectType.replace)
}