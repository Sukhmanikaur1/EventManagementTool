import React,{useState,useRef} from 'react'
import { Link, useNavigate} from 'react-router-dom'

import '../styles/loginSignup.css'

import {registerUser} from '../services/UserService'
const SignUp = () => {
    const fname = useRef('')
    const lname = useRef('')
    const username= useRef("")
    const password=useRef("")
    const [toastActive,setToastActive] = useState(false)
    const navigate = useNavigate()
    const handleRegister = async (event)=>{
        event.preventDefault()
        const res = await registerUser({username:username.current.value,fname:fname.current.value,password:password.current.value,lname:lname.current.value,email:username.current.value})
        if(res){
            
            navigate(`/`)
        }
        else{
            
           
        }
    }
    return (
        <main className="login-pg register-pgs">
            
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-signup-container">
                <h2 >Sign Up for Company Name</h2>
                <form>
                    <input ref={fname}  type="text" placeholder="Enter First Name" required />
                    <input ref={lname}  type="text" placeholder="Enter Last Name" required />
                    <input ref={username}type="email" placeholder="Enter email address" required />
                    <input ref={password}type="password" placeholder="Enter Password" required />
                    <button onClick={handleRegister}>Sign Up</button>
                </form>
                <span>Already have an account? <Link to="/login">Log In</Link></span>
            </div>
        </main>
    )
}

export default SignUp

