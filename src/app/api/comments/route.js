import prisma from "@/lib/db"
import { getAuthSession } from "@/utils/auth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    // due to the api/blog/[slug] -> slug is recevied the param
    const {searchParams} = new URL(req.url)
    const postSlug = searchParams.get("postSlug")
    try {
        
        const comments = await prisma.comment.findMany({
            where:{
                ...(postSlug && {postSlug})
            },
            include:{user:true}
        })
        return new NextResponse(JSON.stringify({comments},{status:200}))
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "when fetching from comments something went wrong!" }, { status: 500 }))
    }
} 

export const POST = async (req) => {
    // due to the api/blog/[slug] -> slug is recevied the param
    const session = await getAuthSession()
    if(!session) {
        return new NextResponse(JSON.stringify({ message: "Not sign in yet" }, { status: 401 }))
    }
    console.log(session)
    try {
        const body = await req.json()
        const comment = await prisma.comment.create({
            data:{
                ...body, userEmail:session.user.email
            },
            include:{user:true}
        })
        return new NextResponse(JSON.stringify({comment},{status:200}))
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "when fetching from comments something went wrong!" }, { status: 500 }))
    }
} 
