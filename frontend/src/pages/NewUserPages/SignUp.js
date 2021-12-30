import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (

        <main className="login-pg register-pgs">
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-signup-container">
                <h2 >Sign Up for Company Name</h2>
                <form>
                    <input type="text" placeholder="Enter Full Name" required />
                    <input type="email" placeholder="Enter email address" required />
                    <input type="password" placeholder="Enter Password" required />
                    <button>Sign Up</button>
                </form>
                <span>Already have an account? <Link to="/login">Log In</Link></span>
            </div>
        </main>
    )
}

export default SignUp

