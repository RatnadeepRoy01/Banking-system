import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers,signIn, signOut, auth } = NextAuth({
   
    providers: [
        CredentialsProvider({
        
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "suma@gmail.com" },
            password: { label: "Password", type: "password" },
            firstName: { label: "firstName", type: "text", placeholder: "suma" },
          },
          async authorize(credentials) {
              
               const res= await fetch("http://localhost:3000/router/router1",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(credentials?.email)
               })
               let response= await res.json();
                 
            if (response &&(credentials.password==response.password)) {
              
              if(credentials?.firstName != undefined){
                response.firstName=credentials.firstName
              }
              
              return response;
            } else {
          
              return null;
            }

          }
        })
      ],
     
      pages: {
        signIn: '/Login',   
      },
   
      session: {
        strategy: "jwt",  
      },

      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user._id;
           if(user.firstName){
            token.name=user.firstName
           }
          }
          return token;
        },
        async session({ session, token }) {
          session.user.id = token.id;
          session.user.name=token.name || null;
          return session;
        },
      },
   
      secret:"guyuyytg8ui8", 

})