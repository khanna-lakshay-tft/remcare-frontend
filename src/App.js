import React from 'react';
import "./App.css";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import AppWrapper from './components/wrapper/AppWrapper';
import AuthWrapper from './components/wrapper/AuthWrapper';

const App = () => {

  const routes = createBrowserRouter([
    {
      path:"/",
      element:<AppWrapper/>,
      children:[{
        path:"/",
        element:<Dashboard/>
      }]
    },{
      path:"/auth",
      element:<AuthWrapper/>,
      children:[{
        path:"login",
        element:<Login/>
      },{
        path:"signup",
        element:<SignUp/>
      }]
    }
  ])

  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App