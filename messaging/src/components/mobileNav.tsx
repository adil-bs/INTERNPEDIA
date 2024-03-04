'use client'
import { Tune } from '@mui/icons-material'
import { Drawer, IconButton } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import SideLineBar, { SideLineExclusiveProps } from './sideLineBar'
import { UserDataContextType } from './context'
import { usePathname } from 'next/navigation'

interface MobileNavProps{
  sidelineBarProps : SideLineExclusiveProps
}

const MobileNav:FC<MobileNavProps>= ({sidelineBarProps}) => {
  const [openNav, setOpenNav] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    handleClose()
  }, [pathname])

  const handleClose = () => setOpenNav(false)
  
  return (
    <div className='md:hidden bg-inherit absolute top-6 right-6'>
      <IconButton onClick={() => setOpenNav(prev => !prev)}>
        <Tune/>
      </IconButton>
      <Drawer open={openNav} onClose={handleClose}>
        <SideLineBar className='' {...sidelineBarProps} handleClose={handleClose}/>
      </Drawer>
    </div>
  )
}

export default MobileNav