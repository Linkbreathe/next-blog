"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import style from './loginPage.module.css'
import Link from 'next/link'

const LoginPage = () => {
  const { data, status } = useSession()
  console.log(data, status)
  return (

    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.socialButton} onClick={() => signIn("google")}>Sign in with Google</div>
        <div className={style.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        <div className={style.socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  )
}

export default LoginPage