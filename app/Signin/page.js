"use client"
import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {

    const Router=useRouter()

   const active="outline rounded-md outline-gray-500 outline-1 p-2 w-full";
     const[Data,setData]=useState({
         email:"",
         password:"",
     })

    
     const onChange=(e)=>{
        setData({
            ...Data,
            [e.target.name]:[e.target.value]
        })
        console.log(e.target.value)
     }

    const submitAction=()=>{
       
    signIn('credentials', {
            
         redirect:true, 
         email:Data.email,
         password:Data.password,
         callbackUrl:"/Home"  

       })
    }
  return (<>
<div className='flex'>
    <div className='h-screen w-[50%] p-10'>
       <form action={()=>{submitAction()}} className='h-full'>
        <div className='flex flex-col justify-evenly h-full'>
        <div className='space-y-2'>
          <div className='text-2xl font-bold'>Log in</div>
          <div>Welcome back! please enter your details</div>
          </div>

             <div className='w-full'>
                <div>Email</div>
                <input className={active} type='text'onChange={(e)=>{onChange(e)}} name="email" value={Data.email} placeholder='ex: Suma@gmail.com'/>
            </div>

            <div className='w-full'>
                <div>Password</div>
                <input className={active} type='password'onChange={(e)=>{onChange(e)}} name="password" value={Data.password} placeholder='ex: Suma.@012'/>
            </div>
            

             <div>
                <input type="submit" placeholder='Sign up' className='bg-blue-600 w-full rounded-md p-3 text-white cursor-pointer '/>
             </div>

          </div>
       </form>
    <div className='hover:cursor-pointer'><Link href="/Login">Don't have an account? Sign up</Link></div>
    </div>
    <div className="h-screen w-[50%]">
    <img
        src="/images/shot1.jpg" // Relative path from the `public` directory
        layout="fill" // Ensures the image covers the entire area // Adjusts the image to cover the entire space
        className="h-screen w-full object-cover"
      />    
      </div>
    </div>
    </>
  )
}

export default Page