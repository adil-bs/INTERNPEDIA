import { removeFriend } from '@/app/actions/friend'
import { Friend } from '@/types/friends'
import { SidebarOption } from '@/types/sidebar'
import { Delete } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, MouseEvent } from 'react'

export const SideBarOptionClickable: FC<SidebarOption> = (props) => {
  const pathname = usePathname()
  return (
    <li>
      <Link
        href={props.href}
        className={`text-gray-700 hover:text-green-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold
        ${pathname === props.href && ' border-green-600 border-2 text-green-600 bg-green-50 hover:bg-green-50'}`}
      >
        <span className='group-hover:border-green-600 group-hover:text-green-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium'>
          <props.Icon />
        </span>

        <span className='truncate'>{props.name}</span>
      </Link>
    </li>
  )
}

export const SideBarChatClickable: FC<Friend> = (props) => {
  const pathname = usePathname()
  const href = '/dashboard/chat/' + encodeURIComponent(props.email)

  const handleFriendDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, friend: Friend) => {
    e.stopPropagation()
    e.preventDefault()
    await removeFriend(friend)
  }
  return (
    <Link href={href}>
      <ListItem
        className={`mb-1 text-gray-700 group hover:text-green-600 hover:bg-gray-50 rounded-md 
          ${pathname === href && ' border-green-600 border-2 text-green-600 bg-green-50 hover:bg-green-50'}`}
        secondaryAction={
          <div className='hidden group-hover:flex '>
            <IconButton edge="end" aria-label="delete" onClick={e => handleFriendDelete(e, props)}>
              <Delete />
            </IconButton>
          </div>
        }
      >
        <ListItemAvatar className='-mx-1'>
          <Avatar >{props.email[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={props.email}
          secondaryTypographyProps={{ color: 'inherit' }}
          primary={props.uname}
          primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
        />
      </ListItem>
    </Link>
  )
}