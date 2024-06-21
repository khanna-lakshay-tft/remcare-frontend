import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./Navbar.css";
import { API_URL } from '../../utils/constants';
import Logo from "../../assets/logo.png";

const Navbar = ({routes}) => {

    const navigate = useNavigate();

    const logoutApi = async() => {
        try {
            const response = await fetch(`${API_URL}/api/logout`,{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type":"application/json"
                },
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(JSON.stringify(data.error));
            }
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            navigate("/auth/login");

        } catch (error) {
            alert(error.message);
        }
    }

    const logout = (name) => {
        if(name==="Logout"){
            logoutApi();
        }
    }

  return (
    <div className='nav-wrapper'>
        <div className='logo-container'>
            <img src={Logo} alt='Logo'/>
        </div>
        <div className='links'>
            <ul>{routes?.map((route)=>(
                <li key={route.name} onClick={()=>logout(route.name)}>
                    <NavLink to={route.path} className={(navData) => (navData.isActive ? 'active' : '')}>{route.name}</NavLink>
                </li>
            ))}
            {
                localStorage.getItem("user") ? (<div>Welcome, {JSON.parse(localStorage.getItem("user")).name}</div>): null
            }
            </ul>
            
        </div>
    </div>
  )
}

export default Navbar