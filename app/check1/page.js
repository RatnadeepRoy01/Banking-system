"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
  const[Data,setData]=useState(null)
    useEffect(()=>{ 
      fetch("../router/router4",{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
        }).then((response)=>{
          return response.json();
     }).then((response1)=>{
           setData(response1)
     })
},[])
useEffect(()=>{

if(Data){
  console.log(Data,"jkkkk")
}
},[Data])
  return (
    <>
    <div>hi</div>
    <div>
      {
      Data &&  Data.map((transation)=>{

        if(!transation.individualAchId){
        return(
          
            <>
            <div>id={transation.id}</div>
            <div>status={transation.status}</div>
            <div>amount={transation.amount.value}</div>
            <div>created={transation.created}</div>
            <div>-----------------------------</div>
            </>
          )
        }
        })
      }
    </div>
    </>
  )
}

export default Page
