import { NextResponse } from "next/server";
import User from "@/app/models/model1"
import User1 from "@/app/models/model"

export async function POST(request){

   let data=await request.json();
  console.log(data,"data1");
 
 if(data?.response){

   console.log("got the data")
   console.log(data,"data")
 try{
    let user = await User.findOne({email:data.email});
    let user1= await User1.create({
      email:data.email1,
      funding:data.funding,
      customerID:data.response
    })
    user.owner.push(user1._id);
    await user.save();
   
    console.log(user1,"user1")
    return NextResponse.json({sucess:"sucess"})
 }catch(error){
    return NextResponse.json({error:"error"})
 }
 }else if(data?.ids){

   console.log(data.ids,"22222222222222222222222")
   console.log(data.email,"22222222222222222222222")


   let user2=await User.findById(data.ids).populate("owner");
   console.log(user2,"user")
   let user=user2.owner[ parseInt(data.num)]
   let user1= await User1.findOne({email:data.email})   
   
   console.log(user1,"user11111")

   if(!user1){
      return NextResponse.json({Error:"invalid client Email provided"})
   }
   user1.message=data.message;
   await user1.save();
   console.log(user,"user")

   return NextResponse.json({From:user.funding,To:user1.funding})

 } 
 else if(typeof data != "string" && !data.access_token && !data.data && !data.session && !data.getID && !data.numID && !data.getSession){
 
      if(data.password != data.confirmPassword){
    return NextResponse.json("Error:password unmatched");
   }
   let user1=await User.create({
    email:data.email,
    password:data.password
   })
  
   return NextResponse.json(user1);
}else if(data.access_token){

   
let user=await User.findOne({_id:data.id}).populate("owner");
let user1=user.owner[user.owner.length-1];
user1.login=data.access_token;
await user1.save();

return NextResponse.json({sucessfull:"sucessfull"})

}else if(data.data){

    
  let user=await User.findOne({_id:data.data}).populate("owner");
  let user1=[] 
 
  for(const data of user.owner){

   if(!data.login){
   continue;
  }
   user1.push(data.login);
  }

  console.log(user1,"gotData")
  return NextResponse.json({login:user1 ,email:user.email})

}
else if(data.session){

      console.log("inside")
  console.log(data,"session")   
   let user1=await User.findOne({_id:data.session}).populate("owner");
    console.log(user1,"user1")
   let data1=user1.owner[parseInt(data.page)].customerID;
   console.log(data1,"data1")
   return NextResponse.json({user:data1})

}else if(data.getID){

   console.log("inside")

   let user=await User.findOne({_id:data.getID}).populate("owner");
   console.log(user,"user")
   let user1=user.owner[0].customerID;
   console.log(user1,"user111111")
   return NextResponse.json({data4:user1,email:user.email})

}else if(data.numID){

let user=await User.findById(data.numID);
let user1=user.owner.length;
return NextResponse.json(user1);

}
else if(data.getSession){

   let user= await User.findById(data.getSession).populate("owner");
   let user1=[];
   
   user.owner.map((email)=>{

    user1.push(email.email)

   })

   return NextResponse.json({userData:user1})

}
else{

   let user1=await User.findOne({email:data});

 
   return NextResponse.json(user1)
}

} 