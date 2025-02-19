import { NextResponse } from "next/server";
import dwolla from 'dwolla-v2';

const client = new dwolla.Client({
    environment: process.env.DWOLLA_ENV,
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
  });

 async function getAccessToken(){

  try{
  const response = await fetch('https://api-sandbox.dwolla.com/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString(),
  });


  
  console.log("hi");
  
  if (response.ok) { 
    const data = await response.json(); 
   console.log("Acess Token", data.access_token)
   return  data.access_token;
  }
}catch(error){
  console.log("Error in access Token",error)
}
}
export async function POST(request){
    
    const data= await request.json();
    let funding1;
    let customer;
    let email1;
  
    if(data?.city){

          
      if(data?.email){
        const timestamp = Date.now();
  
       email1=`${timestamp}@hzn.com`
      }
  

    const fakeUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: email1,
        type:"personal",
        address1: data.address1,
        city: data.city,
        state: data.state,
        postalCode: '50309',
        dateOfBirth: "2005-11-30",
        ssn: "1234",
      };
  
      console.log(fakeUser,"datagot")

      const fundingSource = {
        routingNumber: '222222226', 
        accountNumber: '987654321', 
        bankAccountType: 'checking',   
        name: 'Test Bank Account',
      };

      try {
     
       console.log("inside")
        const response = await client.post("customers", fakeUser);
        console.log(response,"response");
        const locationHeader = response.headers.get('location');
        const customerId = locationHeader.split('/').pop();
       customer=customerId;
        const id="customers/"+customerId+"/funding-sources";
       const funding= await client.post(id, fundingSource);
       const fundingID= funding.headers.get('location').split('/').pop();
       funding1=fundingID;
  
        

      }catch(error){
        console.log("Error",error.message)
        return NextResponse("Error")
      }
       const microDepositsData = {
        amounts: [0.01, 0.02] 
      };
      
       //initiate micro payments

    try{
        const response1 = await client.post(`funding-sources/${funding1}/micro-deposits`, microDepositsData);
       console.log(response1);
        console.log('Micro-Deposit Verification Response:', response1);
       console.log(funding1,"fundingID")
    }catch(error){ 

      console.log("Error",error)
      
      return NextResponse.json("Error")

    }

    try{
       fetch("http://localhost:3000/router/router1",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({response:customer,email:data.email,funding:funding1,email1:email1})
       })
       
      

      }catch(error){

        console.log("Error",error);
        return NextResponse.json("Error");

      }
      return NextResponse.json("Success");
    }else{

      console.log("inside the main")
   const response= await  fetch("http://localhost:3000/router/router1",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
       })
         
       let data1 = await response.json();
       if(data1.Error){
        console.log(data1.Error)
        return NextResponse.json({Error:"invalid client Email provided"})
       }
        console.log(data1,"99999999999999")

         // Transfer Data

        const accessToken = await getAccessToken();
       const transferData = {
        _links: {
          source: {
            href: `https://api-sandbox.dwolla.com/funding-sources/${data1.From}`
          },
          destination: {
            href: `https://api-sandbox.dwolla.com/funding-sources/${data1.To}`
          }
        },
        amount: {
          currency: 'USD',
          value: data.amount
        }
      };


      try {

       console.log(accessToken,"Access Token")
       
       const response = await fetch('https://api-sandbox.dwolla.com/transfers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
            'Accept': 'application/vnd.dwolla.v1.hal+json'
        },
        body: JSON.stringify(transferData)
      });
        console.log(response,"response")
         const getting= response.headers.get("location")
  
         return NextResponse.json("success")
      } catch (error) {
        console.error('Error initiating transaction:', error);
   try{
        const transferDetailsResponse = await fetch(data1.From, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.dwolla.v1.hal+json'
          }
        });
    
        if (transferDetailsResponse.ok) {
          const transferDetails = await transferDetailsResponse.json();
          console.log('Transfer Details:', transferDetails);
          const status = transferDetails.status;
          if(status == "unverified"){
            return NextResponse.json({Error:"Bank not verified yet "})
          }
        }
        return NextResponse.json("Server Error")
      }catch(error){
        console.log("Error Occured",error)
        return NextResponse.json({Error:"server error"})
      } 
    }
    }
}