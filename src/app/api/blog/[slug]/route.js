import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req,{params}) => {
    // due to the api/blog/[slug] -> slug is recevied the param
    const {slug} = params; 
    try {
        
        // const [post,count] = await prisma.$transaction([
        //     prisma.post.findMany(query),
        //     prisma.post.count({ where:query.where})
        // ])
        const blog = await prisma.post.findUnique({
            where:{slug},
            include:{user:true}
        })
        return new NextResponse(JSON.stringify({blog},{status:200}))
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "when fetching from posts something went wrong!" }, { status: 500 }))
    }
} 