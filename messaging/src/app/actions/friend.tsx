'use server'
import { authInputs } from "@/types/auth";
import { Friend } from "@/types/friends";
import { db } from "@/utils/db";
import { pusherServer } from "@/utils/socket";
import { cookies } from "next/headers";


export const addFriend = async (friendMail: string) => {
  const userEmail = cookies().get('ChatApp_email')?.value

  if (friendMail === userEmail) throw "You can't be your friend"
  if (! await db.sismember('users', friendMail)) throw 'Not a valid user'

  await Promise.all([
    pusherServer.trigger(`${userEmail}`, 'outgoing_friend_request', { mail: friendMail, info: 'add' }),
    pusherServer.trigger(`${friendMail}`, 'incoming_friend_request', { mail: userEmail, info: 'add' }),
    db.sadd(`outgoing_friend_requests:${userEmail}`, friendMail),
    db.sadd(`incoming_friend_requests:${friendMail}`, userEmail),
  ])
  return 'ok'
}

export const removeFriend = async (friend: Friend) => {
  const userEmail = cookies().get('ChatApp_email')?.value
  const userUname = cookies().get('ChatApp_uname')?.value

  await Promise.all([
    db.srem(`friends:${friend.email}`, { email: userEmail, uname: userUname }),
    db.srem(`friends:${userEmail}`, friend),
    pusherServer.trigger(`${userEmail}`, 'friends_list', { friend: friend, info: 'removefriend' }),
    pusherServer.trigger(`${friend.email}`, 'friends_list', { friend: { email: userEmail, uname: userUname }, info: 'removefriend' }),
  ])
}

export const removeOutgoingRequest = async (friendMail: string) => {
  const userEmail = cookies().get('ChatApp_email')?.value
  await Promise.all([
    pusherServer.trigger(`${userEmail}`, 'outgoing_friend_request', { mail: friendMail, info: 'remove' }),
    pusherServer.trigger(`${friendMail}`, 'incoming_friend_request', { mail: userEmail, info: 'remove' }),
    db.srem(`outgoing_friend_requests:${userEmail}`, friendMail),
    db.srem(`incoming_friend_requests:${friendMail}`, userEmail),
  ])
}

export const getOutgoingFriendRequests = async () => {
  const userEmail = cookies().get('ChatApp_email')?.value
  return await db.smembers(`outgoing_friend_requests:${userEmail}`)
}

export const getIncomingFriendRequests = async () => {
  const userEmail = cookies().get('ChatApp_email')?.value
  return await db.smembers(`incoming_friend_requests:${userEmail}`)
}

export const acceptIncomingFriendRequest = async (friendMail: string) => {
  const userEmail = cookies().get('ChatApp_email')?.value
  const userUname = cookies().get('ChatApp_uname')?.value

  const rawFriendUser: authInputs = await db.get('user:' + friendMail) as authInputs
  const { pass, confirmPass, ...friendDetails } = rawFriendUser

  await Promise.all([
    db.sadd(`friends:${friendMail}`, JSON.stringify({ email: userEmail, uname: userUname })),
    db.sadd(`friends:${userEmail}`, JSON.stringify(friendDetails)),
    db.srem(`incoming_friend_requests:${userEmail}`, friendMail),
    db.srem(`outgoing_friend_requests:${friendMail}`, userEmail),
    pusherServer.trigger(`${friendMail}`, 'outgoing_friend_request', { mail: userEmail, info: 'remove' }),
    pusherServer.trigger(`${userEmail}`, 'incoming_friend_request', { mail: friendMail, info: 'remove' }),
    pusherServer.trigger(`${userEmail}`, 'friends_list', { friend: friendDetails, info: 'addfriend' }),
    pusherServer.trigger(`${friendMail}`, 'friends_list', { friend: { email: userEmail, uname: userUname }, info: 'addfriend' }),
  ])
}

export const rejectIncomingFriendRequest = async (friendMail: string) => {
  const userEmail = cookies().get('ChatApp_email')?.value

  await Promise.all([
    pusherServer.trigger(`${userEmail}`, 'incoming_friend_request', { mail: friendMail, info: 'remove' }),
    pusherServer.trigger(`${friendMail}`, 'outgoing_friend_request', { mail: userEmail, info: 'remove' }),
    db.srem(`incoming_friend_requests:${userEmail}`, friendMail),
    db.srem(`outgoing_friend_requests:${friendMail}`, userEmail),
  ])
}

export const getFriends = async () => {
  const userEmail = cookies().get('ChatApp_email')?.value

  const friends: Friend[] = await db.smembers(`friends:${userEmail}`)
  return friends
}