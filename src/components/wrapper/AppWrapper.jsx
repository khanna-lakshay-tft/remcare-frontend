import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

const AppWrapper = () => {

    useEffect(()=>{
        console.log("protected route triggered");
    },[])

    const routes = [{name:"Home", path:"/"},{name:"Logout", path:"/auth/login"}];

    if (!localStorage.getItem("jwt")) {
        return <Navigate to="/auth/login" replace />;
    }
  return (
    <>
        <Navbar routes={routes}/>
        <Outlet/>
    </>
  )
}

export default AppWrapper