import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const NavLinks = () => {

    const role = useSelector(state => state.users.role)

    return (
        <>
            <Link to="/manage-events">
                <li className="col">Manage Events</li> 
            </Link>
            
            {role !== 'guest' && 
                <Link to="/book-a-slot/paath">
                    <li className="col">Book a Paath Slot</li> 
                </Link>
            }

            <Link to="/create-event/langar">
                <li className="col">Book a Langar</li> 
            </Link>
        </>
    )
}
