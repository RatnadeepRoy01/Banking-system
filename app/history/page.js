"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion';

const Page = () => {

    
  const Router = useRouter();
 const{data: session}=useSession({
   required:true,
    onUnauthenticated(){
   Router.push("./Login");
      }
     })
    

  
  const[Data,setData]=useState(null)
  const [selected, setSelected] = useState(1);
   
    const getData=()=> {
       
     
      fetch("../router/router4",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session.user.id,page:(selected-1)})
       }).then((response)=>{
         
              return response.json();

       }).then((response1)=>{
              setData(response1);

              sessionStorage.setItem(`index${selected}`,JSON.stringify(response1))

       })

    }


  useEffect(()=>{ 

     const hasFetchedData = JSON.parse(sessionStorage.getItem(`index${selected}`));

      console.log(hasFetchedData,"fetchedData")
      if(!hasFetchedData && session?.user?.id){

          getData();

        }
         else if(hasFetchedData){
                     console.log("hi")   
            setData(hasFetchedData)
        } 
      },[session?.user?.id , selected])


     const[numbers,setNumbers]=useState([1]);
      
     useEffect(()=>{
      console.log("reload")
     if(session?.user?.id){
     fetch("../router/router1",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
         body:JSON.stringify({numID:session?.user?.id})
       }).then((response)=>{
         
              return response.json();

       }).then((response1)=>{
            
        console.log("shjdgusghuk")
        let arr=[];
        for(let i=1;i<=parseInt(response1);i++){   
        arr.push(i);
        console.log(numbers,"fhfdff")
       
      }
      setNumbers(arr)
       })
      }
    },[session?.user?.id])
      const handleNext = () => {
        console.log(selected)
        setSelected((prev) => (prev < numbers.length ? prev + 1 : 1));
      };
    
      const handlePrev = () => {
        console.log(selected)
        setSelected((prev) => (prev > 1 ? prev - 1 : numbers.length));
      };
    

        
    return (
    <>
    <Layout>
    <div className='mt-6 bg-zinc-200 flex flex-col mr-6'>
        <div className='space-y-4 mx-1'>
     <div className='flex justify-between'>
      <div>
      <div className='text-lg font-bold'>Transaction history</div>
      <div className='text-[0.8em]'>Gain insights and Track your Transactions Over Time</div>
      </div>
      
      <div className='text-white bg-blue-600 px-4 my-2   rounded-full flex items-center hover:cursor-pointer ' onClick={()=>{getData()}}>
        Refresh
        </div> 
        </div>
      <div className=' flex bg-blue-600 rounded-md text-white w-full p-3 justify-between'>
        
        <div>

        <div>Chase</div>
        <div className='text-[0.8em]'>Chase Growth Savings Account</div>

        </div>

        <div className='bg-white/30 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg p-1'>
            <div>Current Balance</div>
            <div>$1000</div>
        </div>
      </div>
      </div>

      <div>
        <div className="font-bold my-6">Transaction history</div>

      </div>
     
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


      <div className="flex justify-center items-center space-x-6 mt-10 ">
      {/* Previous Arrow */}
      <button onClick={handlePrev} className="p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400">
        ◀
      </button>

      <div className="relative flex items-center space-x-4" style={{ height: '10px' }}>
        {numbers.map((number) => (
          <motion.div
            key={number}
            className={`transition-transform duration-300 ease-in-out ${
              number === selected
                ? 'z-10 scale-125 text-white bg-blue-500 rounded-lg shadow-xl'
                : 'z-0 scale-100 text-gray-500 bg-gray-300 rounded-lg shadow'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: number === selected ? 1 : 0.5 }}
            style={{ width: number === selected ? '80px' : '60px', height: '40px' }}
          >
            <div className="flex items-center justify-center h-full">
              {number}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Arrow */}
      <button onClick={handleNext} className="p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400">
        ▶
      </button>
    </div>

</div>
  
    </Layout>
    </>
  )
}

export default Page
