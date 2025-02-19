"use client"

import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout1 from "../layout/Layout"
import MyContext from '../context/MyContext'
import { useRouter } from 'next/navigation'
const Page = () => {
  
  const { value, setValue } = useContext(MyContext);
  let color= useRef(true);
  const Router=useRouter();

  const{data: session}=useSession({
    required:true,
    onUnauthenticated(){
      Router.push("./Login")
    }
   })

  return (
    <>
    <Layout1>
      <div className='m-4 space-y-8 h-[95vh] overflow-y-auto p-2'>
      <div>
        <p className='text-lg font-bold'>My Bank Accounts</p>
        <p className='text-sm'>Effortlessly Manage Your Banking Activities</p>
      </div>
      <div className='space-y-4'>
        <p className='text-md font-bold'>Your cards</p>
      
      <div className='flex flex-wrap  '>
     
      {value.id && value.id.map((data,index)=>{
        let active="relative bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl w-80 h-40 m-2 p-2 shadow-lg mb-4";
        let active1="relative bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl w-80 h-40 m-2 p-2 shadow-lg mb-4"
      
        if(index % 3==0){
          color.current=!color.current;
        }
        return(
          
     <div className=" h-full " key={index}>
      {/* Card Container */}
      <div className={index != 0 ?(color.current ? active1:active) : active}>
        
        {/* Card Title */}
        <div>
          <p className="text-white text-lg font-semibold">Horizon Banking</p>
        </div>
        
        {/* Copy Icon */}
        <div className="absolute top-4 right-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H8z" />
            <path d="M6 4a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        </div>

        {/* Card Details */}
        <div className="mt-10 flex justify-between">
          <p className="text-white text-xl font-semibold">{value.name}</p>
          <p className="text-white text-sm mt-1">06/24</p>
        </div>

        {/* Card Number */}
        <div className='flex justify-between'> 
        <div className="w-[75%] break-words">
          <p className="text-white text-sm tracking-widest">{data}</p>
        </div>

        {/* Mastercard Logo */}
        <div className="absolute bottom-4 right-6">
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        </div>
      </div>
    </div>   
        ) 
    }
  )
    }

    </div>
   
    </div>
    </div>
    </Layout1>
    </>
  )
}

export default Page
