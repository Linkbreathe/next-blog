import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";


export const authOptions = {
  // global prisma
  adapter: PrismaAdapter(prisma),
  debug: true,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    httpOptions: {
        timeout: 40000,
      },
  }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
    
    // ...add more providers here
  ]
  // ,
  // callbacks:{
  //   async signIn({account,profile}){
  //     if(!profile?.email){
  //       throw new Error("no profile")
  //     }
  //   }
  // }
}

export const getAuthSession = () => getServerSession(authOptions)