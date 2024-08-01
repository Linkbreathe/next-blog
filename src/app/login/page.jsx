"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import style from './loginPage.module.css'
import Link from 'next/link'
import { Button } from "@nextui-org/react";
import Image from 'next/image';

const LoginPage = () => {
  const { data, status } = useSession()
  console.log(data)
  console.log(status)
  return (

    <div className={style.container}>
      <div className={style.wrapper}>

        {/* <div className={style.socialButton} onClick={() => signIn("google")}>Sign in with Google</div>
        <div className={style.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        <div className={style.socialButton}>Sign in with Facebook</div> */}
        <Button className="bg-[#15803d] text-white h-16 p-8" >
          <Image src="/icons/google.png" width={40} height={40} />
          <span className='text-xl'>Sign in with Google</span>
        </Button>
        <Button onClick={() => signIn("github")} className="bg-[#075985] text-white h-16 p-8" >
          <Image src="/icons/github.png" width={40} height={40} />
          <span className='text-xl font-bo'>Sign in with Github</span>
        </Button>

        <Button size="lg" className="bg-[#84cbd7] text-white h-16 p-8">
          <Image src="/icons/facebook.png" width={40} height={40} />
          <span className='text-xl'>Sign in with Facebook</span>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage