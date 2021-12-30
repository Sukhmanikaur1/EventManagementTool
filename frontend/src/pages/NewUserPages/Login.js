import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <main className="login-pg register-pgs">
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-container">
                <h2 >Log in to Company Name</h2>
                <form>
                    <input type="email" placeholder="Enter email address" required />
                    <input type="password" placeholder="Enter Password" required />
                    <button>Log in</button>
                </form>
                <span>Dont have an account? <Link to="/signup">Sign Up</Link></span>
            </div>
        </main>
    )
}

export default Login
