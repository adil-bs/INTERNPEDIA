'use server'
import { db } from '@/utils/db';
import { RedirectType, redirect } from 'next/navigation'
import { cookies } from 'next/headers';
import { auth, authInputs } from '@/types/auth';

const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function authenticate(
  data: FormData,
  authType: auth,
  // addError: (errorArray: string[]) => void
) {
  
  const { email, uname, pass, confirmPass } = Object.fromEntries(data.entries()) 
  let errorList: string[] = []


  if (authType === 'login') {

    const user: null | undefined | authInputs = await db.get(`user:${email}`)

    if (!user) {
      return ["Email is incorrect"]
    } else if (pass !== user.pass) {
      return ["Password is incorrect"]
    }

  } else if (authType === 'signup') {

    //checking input errors
    if (await db.sismember('users', email)) {
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
  redirect('/',RedirectType.replace)

}