import React from 'react'
import Login_SignUp from '../NewUserComponents/Login_SignUp'

const NavBar = (props) => {
    return (
        <nav className="row p-2">
            <ul className="col-auto">
                <li className="navbar-brand"><i id="logo" className="fas fa-calendar-check"></i>Event Management Tool</li>
            </ul>
            <ul className="home-nu-nav-links col-auto row align-content-center">
                {props.navlinkstype}
            </ul>
            <Login_SignUp />
        </nav>
    )
}

export default NavBar
