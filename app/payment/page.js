"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useRouter } from 'next/navigation'

const Page = () => {
const Router = useRouter();
 const{data: session}=useSession({
   required:true,
    onUnauthenticated(){
   Router.push("./Login")
      }
     })
    

const [user,setUser]=useState({
  message:"",
   email:"",
   num:"",
   amount:"",
   ids:"",     
 })

      useEffect(()=>{
        if(session?.user.id){ 
        setUser({
              ...user,
            ids:session?.user.id
          })
        }
      },[session?.user?.id])


const changeData=(e)=>{
  setUser({
    ...user,
        [e.target.name]:e.target.value
     })
     console.log(user)
}

 const submitData=()=>{
try{
  fetch("../router/router3",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify(user)
            }).then((response)=>{

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              return response.json();

            }).then((response1)=>{
              if(response1.Error){

                 alert(response1.Error)
              }
              else{
                alert("Payment initiated")
              }
            })
          }catch(error){
            console.log("Error",error.message)
          }
 }

  return (<>
  <Layout>
    <div className='px-4 pt-3  bg-gray-300'>
      <div className='space-y-3'>
      <div className='space-y-1'>
   <div className='font-bold text-xl'>Payment Transfer</div>
   <div className='text-sm'>Please provide any specific details or notes relatd to the payment transfer</div>
   </div>

   <div>
   <div className='font-bold text-md'>Transfer details</div>
   <div className=' text-sm'>Enter the details of the receipt</div>
   </div>
   </div>
    <form method="POST" className='flex flex-col justify-evenly h-[80vh]' onSubmit={()=>{submitData()}}>
      <div className='flex'>
    <div>
    <div className='font-semibold text-[0.9em]'>
      Select Source Bank
    </div>
    <div className='w-[20vw] text-[0.8em]'>Select the bank account you want to transfer funds from</div>
    </div>
       {/* <select name="num" className='outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] h-[5vh]'>
       <option value="1">Your Bank</option>
       </select> */}
       <input className=' outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] h-[5vh]' type='text' name='num' placeholder='1' value={user.num} onChange={(e)=>{changeData(e)}} />
    </div>

    <div className='flex'>
    <div className='mb-8'>
    <div className='font-semibold text-[0.9em]'>
    Transfer Note (Optional)
    </div>
    <div className='w-[20vw] text-[0.8em]'>Please provide any additional information or instructions related to the transfer</div>
    </div>
      <textarea name="message" className=' outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] ' value={user.message} onChange={(e)=>{changeData(e)}}/>
    </div>
    <div className='space-y-1'>
   <div className='font-bold text-md'>Bank account details</div>
   <div className='text-sm '>Enter the bank account deatils of the recipient</div>
   </div>
     <div className='flex'>
      <div className='font-semibold w-[20vw] text-[0.9em]'>Recipient's Email Address</div>
      <input className=' outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] h-[5vh]' type='text' name='email' placeholder='Suma@gmail.com' value={user.email} onChange={(e)=>{changeData(e)}} />
     </div>

     <div className='flex'>
      <div className='font-semibold w-[20vw] text-[0.9em]' >Recipient's Bank Account Number</div>
      <input className=" outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] h-[5vh]" type='text' name='account' placeholder='11112222' value={user.account} onChange={(e)=>{changeData(e)}}/>
     </div>    
     <div className='flex'>
      <div  className='font-semibold w-[20vw] text-[0.9em]'>Amount</div>
      <input className=' outline rounded-md outline-gray-500 outline-1 ml-8 w-[35vw] h-[5vh]' type='text' name='amount' placeholder='10000000' value={user.amount} onChange={(e)=>{changeData(e)}}/>
     </div>

      <input type='submit' placeholder='Submit form' className='bg-blue-600 w-[60vw] text-white rounded-md py-1'/>
    </form>

    </div>
    </Layout>
    </>
  )
}

export default Page
