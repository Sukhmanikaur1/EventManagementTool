import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const NavLinks = () => {

    const role = useSelector(state => state.users.role)

    return (
        <>
            {role === 'guest' ?
                <Link to="/create-event/langar"><li className="col">Book a Langar Slot</li> </Link>
            :
                <>
                    <Link to="/manage-events"><li className="col">Manage Events</li> </Link>
                    <Link to="/book-a-slot/paath"><li className="col">Book a Paath Slot</li> </Link>
                    <Link to="/create-event/langar"><li className="col">Book a Langar Slot</li> </Link>
                </>
            }
            
        </>
    )
}
