import React, { useEffect, useRef, useState } from 'react'
import LoginSignUp from './EntryButtons'

import '../styles/navbar.css'
import { Link, useLocation } from 'react-router-dom'


const NavBar = (props) => {

    let [toggleNav, setToggleNav] = useState(false)

    const hammyRef = useRef()
    const hammyOutputRef = useRef()

    let location = useLocation()

    const toggleNavAndClasses = () => {
        setToggleNav(!toggleNav)
        hammyRef.current.classList.toggle('active')
        hammyOutputRef.current.classList.toggle('active')
    }

    useEffect(() => {
        if (toggleNav) {  
            toggleNavAndClasses()
        }
    }, [location.pathname])

    return (
        <nav className="row p-2">

            {/* hamburger button */}
            <div className='hammy' ref={hammyRef} onClick={() => {
                toggleNavAndClasses()
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* active hamburger output */}

            {/* {
                toggleNav && */}
                <ul className='hammy-active-output' ref={hammyOutputRef}>
                    {props.navlinkstype}
                    <LoginSignUp />
                </ul>
            {/* } */}

            {toggleNav && <div className='fade-back'  onClick={toggleNavAndClasses}></div>}

            <ul className="col-auto navbar-brand-contain">
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
            
            <ul className="row align-items-center sign-up-custom">
                <LoginSignUp />
            </ul>
        </nav>
    )
}

export default NavBar
