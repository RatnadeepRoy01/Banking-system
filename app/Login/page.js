"use client"
import React, { useContext } from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MyContext from '../context/MyContext';

const Page = () => {

    const Router=useRouter();
    const { Data, setData } = useContext(MyContext);

   const active="outline rounded-md outline-gray-500 outline-1 p-2 w-full";
   
     const onChange=(e)=>{
        setData({
            ...Data,
            [e.target.name]:e.target.value
        })
        console.log(e.target.value)
       
     }

    const submitAction= ()=>{
  
      const keys = Object.keys(Data);
    
      for( let obj of keys){
        
        if( !Data[obj]){
          alert("Specify all the fields")
          return;
        }
       }
       signIn('credentials', {
        
        redirect:true,
        email:Data.email,
        password:Data.password,
        firstName:Data.firstName,
        callbackUrl:"/Home"  

      })

       Router.push("./clientBank")
    }
  return (<>
<div className='flex'>
    <div className='h-screen w-[50%] p-10'>
       <form action={()=>{submitAction()}} className='h-full'>
        <div className='flex flex-col justify-evenly h-full'>
        <div className='space-y-2'>
          <div className='text-2xl font-bold'>Sign up</div>
          <div>Please enter your name</div>
          </div>
         
          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-[50%]'>
                <div>First Name</div>
                <input className={active} type='text' onChange={(e)=>{onChange(e)}} name="firstName" value={Data.firstName} placeholder='ex: Suma'/>
            </div>
            <div className='flex flex-col w-[50%]'>
                <div>Last Name</div>
                <input className={active} type='text' onChange={(e)=>{onChange(e)}} name="lastName" value={Data.lastName} placeholder='ex: Roy'/>
            </div>
          </div>

             <div className='w-full'>
                <div>Email</div>
                <input className={active} type='text'onChange={(e)=>{onChange(e)}} name="email" value={Data.email} placeholder='ex: Suma@gmail.com'/>
            </div>

          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-[50%]'>
                <div>Password</div>
                <input className={active} type='password' onChange={(e)=>{onChange(e)}} name="password" value={Data.password} placeholder='ex: Suma.@012'/>
            </div>
            <div className='flex flex-col w-[50%]'>
                <div>Confirm Password</div>
                <input className={active} type='password'onChange={(e)=>{onChange(e)}} name="confirmPassword" value={Data.confirmPassword} placeholder='ex: Suma.@012'/>
            </div>
          </div>

          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-[50%]'>
                <div>Address</div>
                <input className={active} type='text' onChange={(e)=>{onChange(e)}} name="address1" value={Data.address1} placeholder='ex: cachar assam india'/>
            </div>
            <div className='flex flex-col w-[50%]'>
                <div>City</div>
                <input className={active} type='text'onChange={(e)=>{onChange(e)}} name="city" value={Data.city} placeholder='ex: Silchar'/>
            </div>
          </div>

          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-[50%]'>
                <div>State</div>
                <input className={active} type='text' onChange={(e)=>{onChange(e)}} name="state" value={Data.state} placeholder='ex: Assam'/>
            </div>
            <div className='flex flex-col w-[50%]'>
                <div>Postal code</div>
                <input className={active} type='text'onChange={(e)=>{onChange(e)}} name="postalCode" value={Data.postalCode} placeholder='ex: 503099'/>
            </div>
          </div>

          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-[50%]'>
                <div>Date of birth</div>
                <input className={active} type='text' onChange={(e)=>{onChange(e)}} name="birthDay" value={Data.birthDay} placeholder='ex: Suma.@012'/>
            </div>
            <div className='flex flex-col w-[50%]'>
                <div>SSN</div>
                <input className={active} type='text'onChange={(e)=>{onChange(e)}} name="ssn" value={Data.ssn} placeholder='ex: 123-45-6789'/>
            </div>
          </div>

             <div>
                <input type="submit" placeholder='Sign up' className='bg-blue-600 w-full rounded-md p-3 text-white cursor-pointer '/>
             </div>

          </div>
       </form>
    <div className='hover:cursor-pointer'> <Link href="/Signin">have an account Login</Link></div>
    </div>
    <div className="h-screen w-[50%]">
    <img
        src="/images/shot1.jpg" // Relative path from the `public` directory
        layout="fill" // Ensures the image covers the entire area
        className="h-screen w-full object-cover"
      />    
      </div>
    </div>
    </>
  )
}

export default Page