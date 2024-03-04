'use client'
import SideLineBar, { SideLineExclusiveProps } from "@/components/sideLineBar";
import MobileNav from "@/components/mobileNav";
import { useEffect, useState } from "react";
import { UserDataContext, UserDataContextType } from "@/components/context";
import { getUser } from "../actions/auth";
import { getFriends } from "../actions/friend";
import { pusherClient } from "@/utils/socket";


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

  const handlefriends = ({mail,info, status }: { status: 'accepted' | 'rejected' ,mail:any,info:any}) => {
    if (status === 'accepted') {
      console.log(sideLineProps?.userData.userEmail,' get again ',mail,info);
      
      getDataFromDb()
    }
  }

  useEffect(() => {
    getDataFromDb()
  }, [])
  useEffect(() => {
    if (sideLineProps && sideLineProps.userData) {
      pusherClient.subscribe(sideLineProps.userData.userEmail!);
    }
    pusherClient.bind('incoming_friend_request', handlefriends)
    pusherClient.bind('outgoing_friend_request', handlefriends)

    return () => {
      pusherClient.unbind('outgoing_friend_request', handlefriends)
      pusherClient.unbind('incoming_friend_request', handlefriends)
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

