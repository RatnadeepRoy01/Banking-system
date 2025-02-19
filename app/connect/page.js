"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
const Router=useRouter();
  const{data: session}=useSession({
    required:true,
     onUnauthenticated(){
    Router.push("./Login")
       }
      })
       
          Router.push("./clientBank")
      
return(
  <>
  <div>

  </div>
  </>
)
}


export default Page
