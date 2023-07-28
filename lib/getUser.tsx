import React from 'react'

export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    //We return undefined for the notFound function to work when the invalid user id is passed in
    if (!res.ok) return undefined
    
    return res.json()
}
