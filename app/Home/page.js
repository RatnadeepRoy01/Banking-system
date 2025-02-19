"use client"
import React, { useContext, useEffect,useState } from 'react'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout1 from "../layout/Layout"
import MyContext from '../context/MyContext';
import DonutChart from '../component/DonutChart';
import Loading from '../Loading/page';
const Page = () => {

 const[Data,setData]=useState();
 
 const { value, setValue , balance , setBalance ,loading,setLoading,fade,setFade} = useContext(MyContext);
 
   const{data: session}=useSession({
    required:true,
    onUnauthenticated(){
      redirect("./Login")
    }
   })

   const user={id:session?.user.id};

    const api=(()=>{
    fetch("../router/router2",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({data:user.id})
     }).then((response)=>{
          return response.json();
     })
     .then((res1)=>{

        setBalance(res1.response)
       console.log(res1,"qwer")
       console.log(res1.response[0].balances.available,"1111111111111111111111111111111111112")
        
       setValue( prevState => ({ ...prevState,name:res1.email.split('@')[0] , email:res1.email}))
       setFade(false)
     })
    
    })
  
    useEffect(()=>{

      if(user?.id && !value.name){

        api();
      }

    },[user?.id])

    const getData=()=>{
       
      
      fetch("../router/router4",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session.user.id,page:"0"})
       }).then((response)=>{
         
              return response.json();

       }).then((response1)=>{
              setData(response1);

              sessionStorage.setItem(`index1`,JSON.stringify(response1))

       })

    }
   
    useEffect(()=>{ 

      const hasFetchedData = JSON.parse(sessionStorage.getItem(`index1`));
 
       console.log(hasFetchedData,"fetchedData")
       if(!hasFetchedData && session?.user?.id){
 
           getData();
 
         }
          else if(hasFetchedData){
                      console.log("hi")   
             setData(hasFetchedData)
         } 
       },[session?.user?.id])

     useEffect(()=>{
if(user?.id && ! value.id){
 
      fetch("../router/router1",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({getSession:user.id})
       }).then((response)=>{
         
              return response.json();

       }).then((response1)=>{
        console.log(response1.userData,"aaaaaaaaaaaaa")
              setValue( prevState => ({...prevState,id:response1.userData}));            
       })
      }

     },[user?.id])

     

     let currentData=[]
     if(balance){
   for(const data of balance){
      currentData.push(data.balances.available)
     }
    }
     
   


return (
    <>
    { loading ? <Loading onLoaded={fade} done={()=>{setLoading(false)}} /> :
  <Layout1>
    <div className=' flex h-full  '>
    <div className='w-[75%] px-4 pt-6 space-y-4'>
      {console.log(Data,"dataaaaa")}
     <div>
      <div className='font-bold flex text-[1.5em]'>
        <div>Welcome,</div>
        <div className='text-blue-600'>{value.id !="" &&value.name}</div>
        </div>
      <div className='font-light'>Access & manage your account and transactions efficiently</div>
      </div>
      <div className='outline outline-1 outline-gray-500 h-[16vh] w-full rounded-md flex space-x-4 items-center'>
     
     <div className='h-full'>  <DonutChart dataPoints={currentData && currentData}/></div>
     
     
      <div className='flex flex-col justify-evenly space-y-2'>
       <p className='font-bold text-sm'>{balance?.length} Bank Accounts</p> 
       <div>
       <p className='text-sm'>Total Current Balance</p>     
      <p className='font-bold'> ${balance?.reduce((acc,curr)=> acc+curr.balances.available,0) }</p>      
       </div>
       </div>
        </div>      
       <div className='font-bold text-lg'>Recent transactions</div>  
      

       <div className=' h-[45vh] overflow-y-auto p-2 '>
      <div className='space-y-1 '>

    {

      Data &&  Data.map((transation)=>{
      
        const date = new Date(transation.created);

        const options = {
          weekday: 'long', 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false, 
        };

         const formatter = new Intl.DateTimeFormat('en-US',options );

         const Dates=formatter.format(date)

        if(!transation.individualAchId){

          const links = transation._links;

          const isSent = links['source']?.['resource-type']  == 'customer';
          console.log(isSent,"sented")
        const success = 'w-full flex  text-[0.9em] h-[6em] bg-green-200 flex items-center rounded-md border border-gray-300';
        const failed =  'w-full flex  text-[0.9em] h-[6em] bg-red-200 flex items-center rounded-md border border-gray-300';
        const pending = 'w-full flex  text-[0.9em] h-[6em] flex items-center rounded-md border border-gray-300';
          
        const success1="w-[50%] bg-green-300 rounded-full text-bold  flex justify-center text-green-900 font-extrabold  "
        const failed1=" w-[50%] bg-red-300 rounded-full text-bold  flex justify-center text-red-700 font-extrabold"
        const pending1=" w-[50%] bg-gray-300 rounded-full text-bold  flex justify-center font-bold "
       
        
        const success2='w-[20%] flex justify-center py-1 text-green-900 font-bold'
        const failed2='w-[20%] flex justify-center py-1 text-red-700 font-bold'
        const pending2='w-[20%] flex justify-center py-1 font-bold'
        return(
          
            <>
            <div className={transation.status=="pending"?pending : transation.status=="processed"?success:failed}>
            <div className='w-[40%] flex justify-center fony-semibold '>{transation.id}</div>
            <div className='w-[20%] '><span className={transation.status=="pending"?pending1 : transation.status=="processed"?success1:failed1}>{transation.status}</span></div>
            <div className={transation.status=="pending"?pending2 : transation.status=="processed"?success2:failed2}>{isSent==true ? `-${transation.amount.value}` : `+${transation.amount.value}`}</div>
            <div className='w-[20%] flex justify-center font-semibold'>{Dates}</div>
            </div>
            </>
          )
        }
        })
    
      }

      </div>
      </div>
 


      </div>
 
         <div className='w-[25%] h-full outline outline-1 outline-gray-400 ' >

          <div className='h-[15%] '>
            <img
        src="/images/image1.WebP" // Relative path from the `public` directory
        alt='design'
        width={100}
        height={100}
        layout="fill" // Ensures the image covers the entire area
        className=" w-full object-cover h-full "
      />    
          </div>


    <div className='flex flex-col mx-2 h-[82%] space-y-6 mt-4'>
          <div>
          <div className='font-bold'>{value.id !="" && value.name}</div>
           <div className='font-light'>{value.id!="" && value.email}</div>
           </div>

           <div className='font-bold my-8'>My Banks</div>

           
           { value.id && value.id.map((data,index)=>{
  
   
    return(
      index<=1 &&
           <div className="bg-gray-100 flex items-center justify-center w-full h-[25%]  mt-2 ">
     
      <div className="relative bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl w-full h-full shadow-lg m-1 p-2 mb-2  flex flex-col">
        
        <div className='flex'>
      <div >
          <p className="text-white text-md font-semibold">Horizon Banking</p>
        </div>
        
       
        <div className="absolute top-4 right-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H8z" />
            <path d="M6 4a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        </div>
        </div>
       
        <div className="mt-10 flex justify-between">
          <p className="text-white text-sm font-semibold">{value.name}</p>
          <p className="text-white text-sm mt-1">06/24</p>
        </div>

      
        <div className='flex justify-between'>
        <div className='w-[75%] break-words'>
          <p className="text-white text-[0.75em] tracking-widest">{data}</p>
        </div>

       
        <div >
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        </div>

      </div>
    </div>

)
})}   
           </div>
  
    </div> 

      </div>
  </Layout1>
 } 
    </>
  )
  
}

export default Page
