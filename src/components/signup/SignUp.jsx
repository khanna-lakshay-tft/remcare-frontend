import React, { useState } from 'react'
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });

    const changeInput = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const signupApiCall = async() => {
        try {
            const response = await fetch(`${API_URL}/api/register`,{
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
                name:"",
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
        signupApiCall();
    }

  return (
    <div className='signup-wrapper'>
        <form className='signup-form' onSubmit={submitForm}>
            <h2 className='form-heading'>SIGNUP</h2>
            <input type='text' placeholder='Name' name='name' value={formData.name} onChange={changeInput}/>
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

export default SignUp;