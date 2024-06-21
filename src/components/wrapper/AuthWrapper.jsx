import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const AuthWrapper = () => {

    const routes = [{name:"Login", path:"/auth/login"},{name:"Signup", path:"/auth/signup"}]

  return (
    <>
        <Navbar routes={routes}/>
        <Outlet />
    </>
  )
}

export default AuthWrapper