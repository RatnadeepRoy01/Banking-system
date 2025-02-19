import { NextResponse } from "next/server";
import dwolla from 'dwolla-v2';

const client = new dwolla.Client({
    environment: process.env.DWOLLA_ENV,
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
  });

export async function POST(request){

   const data=await request.json();
   console.log(data,"dataaaaaaaaaaaa")
  
   const response= await  fetch("http://localhost:3000/router/router1",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   })

   let data1=await response.json();
   
   
   if(data1.data4){

    try{

    const customerUrl = `https://api-sandbox.dwolla.com/customers/${data1?.data4}`;

      const appToken = await client.auth.client();
      const response = await appToken.get(customerUrl);
      const customer = response.body;
       
      customer.email=data1.email;
      console.log(customer,"customer1")
    
    return NextResponse.json(customer);

    }catch(err){
       
     console.log(err);
     return NextResponse.json({Error:"error"})


    }
    }
   
   else{
   
   try{
    
        const response = await client.get(`customers/${data1.user}/transfers`);
        const transfers = response.body._embedded['transfers'];
        console.log("transation", transfers);
       
       const enrichedTransfers = transfers.map((transfer) => {
  
        const links = transfer._links;

        const isSent = links['source']?.['resource-type'] === 'funding-source';
        const isReceived = links['destination']?.['resource-type'] === 'funding-source';
       
      if(isSent){
        console.log(isSent,"sent1")
      }else if(isReceived){
        console.log(isReceived,"received1")
      }
      })
        return NextResponse.json(transfers) 

   }catch(error){
    console.log("Error",error.message)
    return NextResponse.json("Error")
   } 
   }
}