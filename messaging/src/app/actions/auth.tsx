'use server'
import { db } from "@/utils/db";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { auth, authInputs } from '@/types/auth';
import { UserDataContextType } from "@/components/context";

const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function authenticate(
  data: FormData,
  authType: auth,
) {
  
  const { email, uname, pass, confirmPass } = Object.fromEntries(data.entries()) 
  let errorList: string[] = []
  
  const user: null | undefined | authInputs = await db.get(`user:${email}`)

  if (authType === 'login') {


    if (!user) {
      return ["Email is incorrect"]
    } else if (pass !== user.pass) {
      return ["Password is incorrect"]
    }

  } else if (authType === 'signup') {

    //checking input errors
    if (user) {
      errorList.push("Email exists !")
    }
    if (!emailPattern.test(email as string)) {
      errorList.push("Email doesn't make sense")
    }
    if (pass !== confirmPass) {
      errorList.push('Password not matching')
    }
    if (errorList.length) {
      return errorList
    }

    await Promise.all([
      db.sadd('users', email),
      db.set(`user:${email}`, JSON.stringify({ email, pass, uname })),
    ])
  
  }


  cookies().set('ChatApp_email',email as string)
  cookies().set('ChatApp_uname',user?.uname || uname as string)
  redirect('/dashboard',RedirectType.replace)

}

export const getUser = async () => {
  return {
    userEmail : cookies().get('ChatApp_email')!.value,
    userUname : cookies().get('ChatApp_uname')!.value,
  }
}

export const logout = async () => {
  cookies().delete('ChatApp_email')
  cookies().delete('ChatApp_uname')
  // redirect('/auths',RedirectType.replace)
}