"use client"
import { useEffect, useState,useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MyContext from '../context/MyContext';
import Image from 'next/image';
import Loading from '../Loading/page';

export default function  Home() {

    const [linkToken, setLinkToken] = useState(null);
    const { Data, setData } = useContext(MyContext);
    const[loading,setLoading]=useState(true);
    const[fade,setFade]=useState(true);

    const Router=useRouter();

    const { data: session } = useSession({
        required:true,
        onUnauthenticated(){
           Router.push("./Login")
        }
    });
    
   const user={
    id: session?.user?.id,
    name: session?.user?.name,
   }

      console.log(user)

useEffect(()=>{
  
  if(user.id ){  
    function createLinkToken() {
      fetch('../router/router2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      }).then((response)=>{
         return response.json();
    }).then((data)=>{
      console.log(data.link_token,"111111111")
      setLinkToken(data.link_token);
    })
}
   if(user?.id ){
    createLinkToken();
   }else if(user.id && !user.name){
    alert("you have already added a bank")
   }
  }
  },[user?.id, user?.name]) 


        const { open, ready } = usePlaidLink ({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
         
          fetch('../router/router2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_token:public_token,id:session?.user?.id }),
          });
          
           if(Data?.city){
          fetch("../router/router1",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(Data)
           }).then((response)=>{
                return response.json();
           })
           .then((res)=>{
              
            
         
            fetch("../router/router3",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(Data)
             })   
         })
        }else{


          fetch("../router/router4",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({getID:session.user.id})
           }).then((response)=>{
             
                  return response.json();
    
           }).then((response1)=>{
  
            console.log(response1,"response1")
            
            fetch("../router/router3",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(response1)
             })       
  
           })



        }
       
       Router.push("./Home");
        },
        onExit: (err, metadata) => {
           
            if (err) {
              console.error('Plaid Link error:', err);
             
              alert('Something went wrong. Please try again.');
             
            } else {
              console.log('User exited Plaid Link flow:', metadata);
              
              alert('You have exited the process. If you want to connect your bank, please try again.');
             
            }

            Router.push("./Home");

          },
        });
      
        useEffect(() => {
            if (linkToken && ready) {
              open(); // Automatically open Plaid Link
               setFade(false) 
            }
          }, [linkToken, ready, open]);
    
    return(
   <>
      {loading ? <Loading onLoaded={fade} done={()=>{setLoading(false)}} /> :
   
      
      
        <Image
        src="/images/bank.jpg" // Relative path from the `public` directory
        layout="fill" // Ensures the image covers the entire area
        className="h-screen w-screen object-cover"
        alt='Loading...'
        />
     
   
    }
   </>
    ) 
}
