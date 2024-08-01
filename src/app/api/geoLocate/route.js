import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        // Define the query to select only the desired fields
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                img: true,
                title: true,
                desc:true,
                location: true
            }
        })

        // Return the posts along with a count
        const count = posts.length
        return new NextResponse(JSON.stringify({ posts, count }), { status: 200 })
    } catch (err) {
        console.error(err)
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 })
    }
}
