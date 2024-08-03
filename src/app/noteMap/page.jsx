
import React from 'react'
import WEB_API from '@/utils/prefix'
import NoteMap from '@/components/noteMap/NoteMap';
const getData = async () => {
    const res = await fetch(`${WEB_API}/geoLocate`)
    if (!res.ok) {
        // throw new Error("Failed")
        return { posts: [], count: 0 };
    } else {
        return res.json()
    }
}

const page = async () => {
    const { posts, count } = await getData();
    console.log(posts)
    return (
        <div>
            <NoteMap posts={posts} />
        </div>

    )
}

export default page;