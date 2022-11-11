import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export const NavLinks = () => {

    const role = useSelector(state => state.users.role)

    const normalStyle = 'normal-style'

    const activeStyle = 'active-style'

    return (
        <>
        {role !== 'guest' && 
            <NavLink to="/manage-events" className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Manage Events</li> 
            </NavLink>
        }
            
                <NavLink to="/book-a-slot/paath" className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                }>
                    <li className="col n-btn">Book a Paath Slot</li> 
                </NavLink>
            

            <NavLink to="/create-event/langar" className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Book a Langar</li> 
            </NavLink>
        </>
    )
}
