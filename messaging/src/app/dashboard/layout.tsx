'use client'
import SideLineBar, { SideLineExclusiveProps } from "@/components/sideLineBar";
import MobileNav from "@/components/mobileNav";
import { useEffect, useState } from "react";
import { UserDataContext, UserDataContextType } from "@/components/context";
import { getUser } from "../actions/auth";
import { getFriends } from "../actions/friend";
import { pusherClient } from "@/utils/socket";
import { Friend } from "@/types/friends";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideLineProps, setSideLineProps] = useState<SideLineExclusiveProps | undefined>()

  const getDataFromDb = async () => {
    await Promise.all([getUser(), getFriends()])
      .then(([userData, friends]) => setSideLineProps({ userData, friends }))
  }

  const handlefriends = ({friend,info}: { friend: Friend , info: 'addfriend' | 'removefriend'}) => {
    
    setSideLineProps(prev => ({
      ...prev!,
      friends : info === 'addfriend'
        ? prev!.friends.concat(friend) 
        : prev!.friends.filter(eachFriend => eachFriend.email!==friend.email)
    }))
  }


  useEffect(() => {
    getDataFromDb()
  }, [])
  useEffect(() => {
    if (sideLineProps && sideLineProps.userData) {
      pusherClient.subscribe(sideLineProps.userData.userEmail!);
    }
    pusherClient.bind('friends_list', handlefriends)

    return () => {
      pusherClient.unbind('friends_list', handlefriends)
      if (sideLineProps && sideLineProps.userData) {
        pusherClient.unsubscribe(sideLineProps.userData.userEmail!);
      }
    }
  }, [sideLineProps?.userData])

  return (
    sideLineProps &&

    <UserDataContext.Provider value={sideLineProps.userData}>
      <div className="flex w-screen">
        <SideLineBar className=" max-md:bg-red-500 max-md:hidden " {...sideLineProps} />
        <MobileNav sidelineBarProps={sideLineProps} />
        {children}
      </div>
    </UserDataContext.Provider>
  );
}

