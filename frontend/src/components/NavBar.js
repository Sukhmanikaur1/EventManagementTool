import React from 'react'
import LoginSignUp from './EntryButtons'

import '../styles/navbar.css'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <nav className="row p-2">
            <ul className="col-auto">
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <li className="navbar-brand">
                        <i id="logo" className="fas fa-calendar-check"></i>
                        Event Management Tool
                    </li>
                </Link>
            </ul>
            <ul className="home-nu-nav-links col-auto row align-content-center">
                {props.navlinkstype}
            </ul>
            <LoginSignUp />
        </nav>
    )
}

export default NavBar
