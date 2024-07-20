import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import POST_PER_PAGE from '@/utils/config'
export const GET = async (req) => {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page")
    const cat = searchParams.get("cat")
    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where:{
            ...(cat && {catSlug:cat})
        }
    }
    try {
        
        const [post,count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where:query.where})
        ])
        return new NextResponse(JSON.stringify({post,count},{status:200}))
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "when fetching from posts something went wrong!" }, { status: 500 }))
    }
} 