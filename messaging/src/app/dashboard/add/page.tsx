'use client'
import { addFriend, getOutgoingFriendRequests, removeOutgoingRequest } from '@/app/actions/friend'
import { UserDataContext } from '@/components/context'
import { pusherClient } from '@/utils/socket'
import { Close, Group, Send } from '@mui/icons-material'
import { Button, Divider, IconButton, TextField } from '@mui/material'
import { EntryType } from 'perf_hooks'
import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'

type FriendStatus = 'initial' | 'loading' | 'send' | 'error'

const Page: FC = () => {
  const userData = useContext(UserDataContext)
  const [status, setStatus] = useState<FriendStatus>('initial')
  const [outgoingFriendRequests, setOugoingFriendRequests] = useState<string[]>([])

  const handleOutgoingFriends = ({ mail, info }: { mail: string, info: string }) => {
    setOugoingFriendRequests(prev => info === 'add'
      ? prev.concat(mail)
      : prev.filter(friend => friend !== mail)
    )
  }

  useEffect(() => {
    pusherClient.subscribe(`${userData!.userEmail}`)
    pusherClient.bind('outgoing_friend_request', handleOutgoingFriends)

    getOutgoingFriendRequests()
      .then(data => setOugoingFriendRequests(data))

    return () => {
      pusherClient.unbind('outgoing_friend_request', handleOutgoingFriends)
      pusherClient.unsubscribe(`${userData!.userEmail}`)
    }
  }, [])

  const handleFormAction = (formData: FormData) => {
    const friendmail: string = Object.fromEntries(formData).email as string
    addFriend(friendmail)
      .then(() => setStatus('send'))
      .catch(() => setStatus('error'))
  }

  const handleCancelRequest = (friend: string) => {
    removeOutgoingRequest(friend)
    setStatus('initial')
  }

  return (
    <div className='flex flex-col w-full md:w-1/2 px-7 mt-16'>
      <p className=' font-semibold text-3xl mb-7'>Add A Friend</p>

      <form
        className='flex items-center gap-6'
        onSubmit={() => setStatus('loading')}
        action={handleFormAction}
      >
        <TextField
          name='email'
          label='Email of your friend'
          placeholder='someone@mail.com'
          type='email'
          fullWidth
          error={status === 'error'}
          FormHelperTextProps={status === 'send' ? { color: 'success' } : {}}
          helperText={status !== 'initial'
            && (status === 'error' && <span className='text-red-500'>Something went wrong</span>)
            || (status === 'send' && <span className='text-green-500'>Friend Request Send !</span>)
          
          }
          InputProps={{
            endAdornment:
              <IconButton
                type='submit'
                disabled={status === 'loading'}
                color='success'
              >
                <Send />
              </IconButton>
          }}
        />
      </form>

      {outgoingFriendRequests.length !== 0 ?
        <div className='mt-16'>
          <p className='font-semibold text-xl mb-4 text-center'>Your Pending Friend Requests</p>
          {outgoingFriendRequests.map((friend, i) =>
            <div className='flex space-y-3 items-center justify-between border rounded-lg p-2' key={i}>
              <p>{friend}</p>
              <Button
                onClick={() => handleCancelRequest(friend)}
                size='small'
                variant='outlined'
                endIcon={<Close />}
                className='!mt-0'
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        :
        <div className='flex flex-col items-center mt-20 text-gray-400'>
          <Divider flexItem variant='fullWidth' />
          <p className='font-semibold text-xl mb-4 mt-6  '>Your pending requests appear here</p>
          <div className=' text-9xl'><Group fontSize={'inherit'} /></div>
        </div>
      }
    </div>
  )
}

export default Page