'use client'
import { acceptIncomingFriendRequest, getIncomingFriendRequests, rejectIncomingFriendRequest } from '@/app/actions/friend'
import { UserDataContext } from '@/components/context'
import { pusherClient } from '@/utils/socket'
import { Clear, Done, } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

const page = () => {
  const userData = useContext(UserDataContext)
  const [incomingRequests, setIncomingRequests] = useState<string[]>([])

  const handleOutgoingFriends = ({ mail, info }: { mail: string, info: 'add'|'remove' }) => {
    setIncomingRequests(prev => info === 'add'
      ? prev.concat(mail)
      : prev.filter(friend => friend !== mail)
    )
  }
  useEffect(() => {
    pusherClient.subscribe(`${userData!.userEmail}`)
    pusherClient.bind('incoming_friend_request', handleOutgoingFriends)

    const fetchIncomingFriendRequests = async () => {
      setIncomingRequests(await getIncomingFriendRequests())
    }
    fetchIncomingFriendRequests()

    return () => {
      pusherClient.unbind('incoming_friend_request', handleOutgoingFriends)
      pusherClient.unsubscribe(`${userData!.userEmail}`)
    }
  }, [])

  return (
    <div className='flex flex-col w-full md:w-1/2 px-7 mt-16'>
      <p className=' font-semibold text-3xl mb-7'>Friend Requests</p>

      <div>
        {incomingRequests.length !== 0 ?
          <>
            {incomingRequests.map((request, i) =>
              <div className='flex items-center mb-2 justify-between bg-gray-200 p-2 rounded-lg' key={i}>
                <p>{request}</p>

                <div>
                  <IconButton
                    color='success'
                    onClick={() => acceptIncomingFriendRequest(request)}
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => rejectIncomingFriendRequest(request)}
                  >
                    <Clear />
                  </IconButton>
                </div>

              </div>
            )}
          </>
          :
          <p className=' text-xl text-gray-400'>No Requests For Now</p>
        }

      </div>

    </div>
  )
}

export default page