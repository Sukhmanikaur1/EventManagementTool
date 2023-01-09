import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export const NavLinks = () => {
    let user = useSelector(state => state.users.currentUser)
    
    if (!user.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
    user= JSON.parse(sessionStorage.getItem('user'))
    const role = user?.role
    const normalStyle = 'normal-style'

    const activeStyle = 'active-style'
    console.log("role "+role)
    return (
        <>
        {role === 'admin' && 
            <NavLink  to="/manage-events" className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Manage Events </li> 
                
            </NavLink>
        }
            
            {user?.tokenId?<>
                <NavLink to="/book-a-slot/paath" className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                }>
                    <li className="col n-btn">Book a Paath Slot</li> 
                </NavLink>
            

            <NavLink to={`/create-event/langar/${user.tokenId}`} className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Book a Langar</li> 
            </NavLink>
            </>:<></>}
        </>
    )
}
