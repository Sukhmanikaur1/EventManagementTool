import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export const NavLinks = () => {

    const role = useSelector(state => state.users.role)

    const normalStyle = {
        textDecoration: 'none',
        backgroundColor: 'var(--purple-shade)',
        color: 'var(--orange-shade)',
        borderRadius: '5px',

    }

    const activeStyle = {
        textDecoration: 'none',
        backgroundColor: 'var(--purple-shade)',
        color: 'black',
        borderRadius: '5px',
        border: '1px solid black',
        fontWeight: '700'
    }

    return (
        <>
        {role !== 'guest' && 
            <NavLink to="/manage-events" style={({ isActive }) =>
            isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Manage Events</li> 
            </NavLink>
        }
            
                <NavLink to="/book-a-slot/paath" style={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                }>
                    <li className="col n-btn">Book a Paath Slot</li> 
                </NavLink>
            

            <NavLink to="/create-event/langar" style={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
            }>
                <li className="col n-btn">Book a Langar</li> 
            </NavLink>
        </>
    )
}
