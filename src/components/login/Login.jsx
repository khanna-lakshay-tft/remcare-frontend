import React, { useState } from 'react'
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const changeInput = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const loginApiCall = async() => {
        try {
            const response = await fetch(`${API_URL}/api/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(JSON.stringify(data.error));
            }
            setFormData({
                email:"",
                password:""
            });
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        loginApiCall();
    }

  return (
    <div className='login-wrapper'>
        <form className='login-form' onSubmit={submitForm}>
            <h2 className='form-heading'>LOGIN</h2>
            <input type='text' placeholder='Email' name='email' value={formData.email} onChange={changeInput}/>
            <input type='password' placeholder='Password' name='password' value={formData.password} onChange={changeInput}/>
            <button type='submit'>
                <div>SUBMIT</div>
                <div></div>
            </button>
        </form>
    </div>
  )
}

export default Login