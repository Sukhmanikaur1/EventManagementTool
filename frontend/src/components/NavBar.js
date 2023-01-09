import React, { useEffect, useRef, useState } from 'react'
import LoginSignUp from './EntryButtons'

import '../styles/navbar.css'
import { Link, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'


const NavBar = (props) => {

    let [toggleNav, setToggleNav] = useState(false)
    let user = useSelector(state => state.users.currentUser)
    // console.log(JSON.parse(sessionStorage.getItem('user')))
    // user?.tokenId? console.log("userdata"):
    // console.log(JSON.parse(sessionStorage.getItem('user')))
    
    const hammyRef = useRef()
    const hammyOutputRef = useRef()
    console.log(user)
    let location = useLocation()
    if (!user.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
    user= JSON.parse(sessionStorage.getItem('user'))
    console.log(JSON.parse(sessionStorage.getItem('user'))?.fname)
    console.log(user.fname)
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
        <nav className="p-2 navbar-sticky">

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
            <ul className="home-nu-nav-links col-auto align-content-center">
                {props.navlinkstype}
            </ul>
            <ul className=" p-2 sign-out-name-custom ">
            {user.fname?<span className="hello">Hello {user.fname} {user.lname}</span>:<></>}
            </ul>
            <ul className="align-items-center sign-up-custom">
                <LoginSignUp />
            </ul>
        </nav>
    )
}

export default NavBar
