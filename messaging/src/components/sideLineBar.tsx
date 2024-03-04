import { SidebarOption } from '@/types/sidebar'
import { ExitToApp, Groups, PersonAddAlt1, Sync } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from '@mui/material'
import Link from 'next/link'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { UserDataContextType } from './context'
import { logout } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { SideBarChatClickable, SideBarOptionClickable } from './sideBarClickable'
import { Friend } from '@/types/friends'

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Global Chat',
    href: '/dashboard/chat/globalchat',
    Icon: Groups,
  },
  {
    id: 2,
    name: 'Add Friend',
    href: '/dashboard/add',
    Icon: PersonAddAlt1,
  },
  {
    id: 3,
    name: 'Friend Requests',
    href: '/dashboard/requests',
    Icon: PersonAddAlt1,
  },
]

export interface SideLineExclusiveProps {
  userData: UserDataContextType
  friends: Friend[]
}
interface SideLineBarProps extends HTMLAttributes<HTMLElement>, SideLineExclusiveProps {

}

const SideLineBar: FC<SideLineBarProps> = ({ userData, friends, className, ...other }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/auths')
  }
  return (

    <nav className={' h-screen max-h-screen flex flex-col pt-10 pb-4 gap-y-5 border-r border-gray-200 px-6' + className}>
      <ul role='list' className='flex flex-col gap-y-7 h-full'>

        <li >
          <div className='text-xs font-semibold leading-6 text-gray-400'>
            Overview
          </div>

          <ul role='list' className='-mx-2 mt-2 space-y-1'>
            {sidebarOptions.map((option, i) =>
              <SideBarOptionClickable key={i} {...option} />
            )}
          </ul>
        </li>

        {friends.length !== 0 &&
          <li>
            <div className='text-xs font-semibold leading-6 text-gray-400'>
              Your Chats
            </div>

              <List disablePadding dense>
                {friends.map((friend, i) =>
                  <SideBarChatClickable key={i} {...friend} />
                )}
              </List>


          </li>
        }

        <li className='-mx-6 mt-auto flex items-center '>
          <div className='flex flex-1 items-center gap-x-4 py-3 px-3 text-sm font-semibold leading-6 text-gray-900'>
            <Avatar alt={userData.userUname.toUpperCase()}>{userData.userUname[0].toUpperCase()}</Avatar>

            <span className='sr-only'>Your profile</span>
            <div className='flex flex-col'>
              <span aria-hidden='true'>{userData.userUname}</span>
              <span className='text-xs text-zinc-400' aria-hidden='true'>
                {userData.userEmail}
              </span>
            </div>
          </div>

          <Tooltip title='Logout'>
            <IconButton onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </nav >
  )
}

export default SideLineBar