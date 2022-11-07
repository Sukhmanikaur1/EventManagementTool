import React from 'react'
import { NavLink } from 'react-router-dom';

const normalLogin = {}

const activeLogin = {
    color: 'black',
    fontWeight: '700'
}

const normalSignUp = {
    color: 'var(--orange-shade)',
    backgroundColor: 'none'
}

const activeSignUp = {
    backgroundColor: 'yellow',
    fontWeight: '700'
}

const activeClassName = 'su-active'

const EntryButtons = () => {
    return (
        <ul className="row align-items-center sign-up-custom">
            <li className="col-auto login-link">
                <NavLink to="/login" style={({ isActive }) =>
                    isActive ? activeLogin : normalLogin
                }>Log In</NavLink>
            </li>
            <li className="col-auto  login-link">
            <NavLink to="/signup" className={({ isActive }) =>
                    isActive ? activeClassName : 'signup-btn'
                }>
            
                Sign Up
                    {/* <button className="signup-btn p-1">Sign Up</button> */}
                </NavLink>
            </li>
        </ul>
    )
}

export default EntryButtons
