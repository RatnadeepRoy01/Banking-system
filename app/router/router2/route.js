// pages/api/createLinkToken.js
import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env. PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env. PLAID_SECRET
    },
  },
});

const client = new PlaidApi(configuration);


export async function POST(request) {

  const data = await request.json();
 
  if(data.user_id){
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: data.user_id },
      client_name: 'Horizon',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });

   return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
  }else if( data.public_token ){


  try {
    const response = await client.itemPublicTokenExchange({ public_token:data.public_token });
    const access_token = response.data.access_token;

  console.log(data,"found2")

   await fetch("http://localhost:3000/router/router1",{
      
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:data.id,access_token:access_token})
    })

   return NextResponse.json({access_token})
  } catch (error) {

   return NextResponse.json({ error: error.message });

  }
}else if(data.data){


 // console.log(data,"11111111111111111111111")
 const login=await fetch("http://localhost:3000/router/router1",{
      
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })


  let token=await login.json();
  let access_token=token.login;

   console.log(access_token,"qqqqqq")
try{

   let data4=[];

   await Promise.all(
  access_token.map(async(key)=>{
 
 const response= await client.accountsGet({access_token:key });
 
 await Promise.all(
  response.data.accounts.map((account)=>{

    data4.push( account)
   })
  );
 })
); 
console.log(data4,"dataaaaaaaaaaaaaaaa")
    return NextResponse.json({ response:data4 , email:token.email});
  
}catch(err){

  console.log(err);
  return NextResponse.json({Error:err} );

}

}else{
  return NextResponse.json({Error:"Server Error"})
}


}
