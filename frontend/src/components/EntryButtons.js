import React from 'react'
import { NavLink } from 'react-router-dom';

const normalLogin = {
    textDecoration: 'none'
}

const activeLogin = {
    color: 'black',
    fontWeight: '700',
    textDecoration: 'none'
}

const normalSignUp = {
    textDecoration: 'none',
    color: 'var(--orange-shade)',
    backgroundColor: 'var(--purple-shade)',
    borderRadius: '10px',
}
const activeSignUp = {
    textDecoration: 'none',
    fontWeight: '700',
    backgroundColor: 'var(--purple-shade)',
    borderRadius: '10px',
    color: 'black'
}

const EntryButtons = () => {
    return (
        <>
            
                <NavLink to="/login" className='nav-login' style={({ isActive }) =>
                    isActive ? activeLogin : normalLogin
                }>
                    <li className="col-auto login-link">
                    Log In
                    </li>
                    </NavLink>
            
            <NavLink to="/signup" className='nav-signup' style={({ isActive }) =>
                    isActive ? activeSignUp : normalSignUp
                }>
            <li className="col-auto  login-link">
                Sign Up
                </li>
                    {/* <button className="signup-btn p-1">Sign Up</button> */}
                </NavLink>
        </>
    )
}

export default EntryButtons
