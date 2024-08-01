import prisma from "@/lib/db"
import { getAuthSession } from "@/utils/auth"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    // due to the api/blog/[slug] -> slug is recevied the param
    const session = await getAuthSession()
    if(!session) {
        return new NextResponse(JSON.stringify({ message: "Not sign in yet" }, { status: 401 }))
    }
    
    try {
        const body = await req.json()
        console.log(req)
        const post = await prisma.post.create({
            data:{
                ...body, userEmail:session.user.email
            },
            include:{user:true}
        })
        return new NextResponse(JSON.stringify({post},{status:200}))
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "when fetching from creating post something went wrong!" }, { status: 500 }))
    }
} 
