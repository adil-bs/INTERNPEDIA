'use client'
import { createContext } from "react";

export interface UserDataContextType {
  userUname: string
  userEmail: string
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);