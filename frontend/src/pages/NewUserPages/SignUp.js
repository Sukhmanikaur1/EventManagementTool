import React,{useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import {registerUser} from '../../services/UserService'
const SignUp = () => {
    const fname = useRef('')
    const username= useRef("")
    const password=useRef("")
    const [user,setUser]=useState()
    const handleRegister = async (event)=>{
        event.preventDefault()
       await setUser({fname,username, password})
        const res = await registerUser({username:username.current.value,fname:fname.current.value,password:password.current.value,lname:"dasd",email:username.current.value})
        console.log(res)
    }
    return (

        <main className="login-pg register-pgs">
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-signup-container">
                <h2 >Sign Up for Company Name</h2>
                <form>
                    <input ref={fname}  type="text" placeholder="Enter Full Name" required />
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

