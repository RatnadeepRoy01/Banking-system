"use client"
import React, { useState } from 'react';
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [value, setValue] = useState({email:"",name:"",id:""});
  const[balance,setBalance] = useState();
  const[Data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    address1:"",
    city:"",
    state:"",
    postalCode:"",
    birthDay:"",
    ssn:"",
})
    const[loading,setLoading]=useState(true);
    const[fade,setFade]=useState(true);
  return (
    <MyContext.Provider value={{ value, setValue, balance, setBalance, Data, setData ,loading,setLoading,fade,setFade}} >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;