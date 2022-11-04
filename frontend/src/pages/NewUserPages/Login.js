import React,{useRef} from 'react'
import {login} from '../../services/UserService'
import { Link } from 'react-router-dom'

const Login = () => {
    let password =useRef('')
    let email = useRef('')
    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await login(email, password)
        console.log(res)
    }
    return (
        <main className="login-pg register-pgs">
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-container">
                <h2 >Log in to Company Name</h2>
                <form onSubmit={handleSubmit}>
                    <input ref={email} type="email" placeholder="Enter email address" required />
                    <input ref = {password} type="password" placeholder="Enter Password" required />
                    <button>Log in</button>
                </form>
                <span>Dont have an account? <Link to="/signup">Sign Up</Link></span>
            </div>
        </main>
    )
}

export default Login
