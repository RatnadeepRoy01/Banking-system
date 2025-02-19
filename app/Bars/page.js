"use client"

import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MyContext from '../context/MyContext';
import { signOut } from 'next-auth/react';
const Page = () => {

  const Router=useRouter();
  const { value } = useContext(MyContext);
  let active="hover:bg-white hover:text-black rounded-l-lg p-2 h-20px hover:cursor-pointer"

  return (<>
    <div className='flex flex-col justify-between pl-4 pt-4 pb-4 h-screen overflow-hidden bg-blue-600 text-white'>
        <div className='flex flex-col w-full font-semibold space-y-2 '>
    <div className='flex space-x-1'> 
    
    <div className='w-20 h-20 '>      
    <img
      src="/images/logo.WebP"
      alt="logo"
      layout="fill"
      width={100}
      height={100}
      className="object-cover rounded-lg "
    />
      
      </div>  <div className='font-bold text-[20px] p-2'>Horizon</div></div>
        <div className={active} onClick={()=>{Router.push("./Home")}}>Home</div>
        <div className={active} onClick={()=>{Router.push("./bank")}}>My Banks</div>
        <div className={active} onClick={()=>{Router.push("./history")}}>Transation History</div>
        <div className={active} onClick={()=>{Router.push("./payment")}}>Payment Transfer</div>
        <div className={active} onClick={()=>{Router.push("./connect")}}>Connect Bank</div>
        </div>

        <div className='flex  w-full hover:bg-white hover:text-black rounded-l-lg p-2 font-semibold hover:cursor-pointer' onClick={()=>{signOut({ redirect: true, callbackUrl: '/' })}}>
        <div>
        <div >{value.name}</div>
        <div className='text-sm'>{value.email}</div>
        </div>
        <div> 
        <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 16l4-4m0 0l-4-4m4 4H7M5 21V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H6a1 1 0 01-1-1z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

        </div>
        </div>
    </div>
  </>
  )
}

export default Page