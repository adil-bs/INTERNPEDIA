'use server'
import { UserDataContextType } from "@/components/context";
import { authInputs } from "@/types/auth";
import { Friend } from "@/types/friends";
import { Message } from "@/types/message";
import { db } from "@/utils/db";
import { pusherServer } from "@/utils/socket";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const addMessage = async (message: string, toFriendMail: string) => {
  const timestamp = Date.now()
  const email = cookies().get('ChatApp_email')?.value
  const { uname } = await db.get(`user:${email}`) as authInputs

  if (!uname || !email) return

  const chatSet: Message = { email, uname, message, timestamp }

  if (toFriendMail === 'globalchat') {
    await Promise.all([
      pusherServer.trigger('chat_globalchat', 'new_chat', chatSet),
      db.zadd('chats', {
        score: timestamp,
        member: JSON.stringify(chatSet),
      }),
    ])
  } else {    
    await Promise.all([
      pusherServer.trigger(
        [`chat_${email}-${toFriendMail}`,`chat_${toFriendMail}-${email}`], 
        'new_chat', chatSet
      ),
      db.zadd(`chat:${email}-${toFriendMail}`, {
        score: timestamp,
        member: JSON.stringify(chatSet),
      }),
      db.zadd(`chat:${toFriendMail}-${email}`, {
        score: timestamp,
        member: JSON.stringify(chatSet),
      }),
    ])
  }


}

export const getMessages = async (chatpartner: string)
  : Promise<{ messages: Message[], friend: Friend }> => {

  const userEmail = cookies().get('ChatApp_email')?.value
  if (chatpartner === 'globalchat') {

    const messages = await db.zrange('chats', 0, -1) as Message[]
    return { messages, friend: { email: 'globalchat', uname: 'Global Chat' } }

  } else {
    const friendDetail: Friend | undefined = ((await db.smembers('friends:' + userEmail)) as Friend[])
      .find((friend) => friend.email === chatpartner)
    if (friendDetail === undefined)
      // throw '404'
      notFound()

    const messages = await db.zrange(`chat:${userEmail}-${chatpartner}`, 0, -1) as Message[]

    return { messages, friend: friendDetail }
  }
} 