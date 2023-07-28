import React from 'react'
import getUser from '@/lib/getUser'
import getAllUsers from "@/lib/getAllUsers"
import getUserPosts from '@/lib/getUserPosts'
import UserPosts from './components/UserPosts'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import {notFound} from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}

//Get dynamic metadata info for user, since the req has already been made the userData is deduped
export async function generateMetadata({params: {userId}}: Params):Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)    
    const user: User = await userData
    //If the user doesnt exist throw the PageNotFoundError
    if(!user){
        console.log("No user")
        return{
            title: "User Not Found"
        }
    }

    return {
        title: user.name,
        description: `this is the page of ${user.name}`
    }
}

export default async function UserPage({params: {userId}}: Params) {

    // Requests are fired off at the same time
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise <Post[]> = getUserPosts(userId)

    //Requests are recieved in parallel
    // const[user, userPosts] = await Promise.all([userData, userPostsData])

    const user = await userData

    if(!user) {
        console.log("No user")
        notFound()
    }

  //Instead of waiting for requests to recieve in parallel we can use suspense to delay the render of UserPosts by using suspense 
  return (
    <>
        <h2>{user.name}</h2>
        <br />
        <Suspense fallback={<h2>Loading...</h2>}>
            <UserPosts promise={userPostsData}></UserPosts>
        </Suspense>
    </>
  )
}

//Generate static parameters to prerender all the user data to tell next js what the parameters 
//are going to be when the mouse hovers over a user in the list (Static Site Generation)
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData

    return users.map(user => ({
        userId: user.id.toString()

    }))
    
}
