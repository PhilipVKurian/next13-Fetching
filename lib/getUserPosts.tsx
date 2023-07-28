import React from 'react'

//options object : Using ISR {next: {revalidate: sec}} to fetch once for 60 seconds then check if data has changed, can use cache: "no-store" to always 
//regenerate or 'force-cache' to store the data (default)
export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: {revalidate: 60}}
    )
    //We return undefined for the notFound function to work when the invalid user id is passed in
    if (!res.ok) return undefined
    
    return res.json()
}