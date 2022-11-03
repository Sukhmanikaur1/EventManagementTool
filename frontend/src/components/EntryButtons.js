import React from 'react'
import { Link } from 'react-router-dom';

const EntryButtons = () => {
    return (
        <ul className="row align-items-center sign-up-custom">
            <li className="col-auto login-link"><Link to="/login">Log In</Link></li>
            <li className="col-auto  login-link"><Link to="/signup"><button className="signup-btn p-1">Sign Up</button></Link></li>
        </ul>
    )
}

export default EntryButtons
