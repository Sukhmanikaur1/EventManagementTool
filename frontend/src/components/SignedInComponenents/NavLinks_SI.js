import React from 'react'
import { Link } from 'react-router-dom'

export const NavLinks_SI = () => {
    return (
        <>
            <Link to="/"><li className="col">Home</li> </Link>
            <Link to="/manage-events"><li className="col">Manage Events</li> </Link>
            <Link to="/create-event"><li className="col">Create Event</li> </Link>
            <Link to="/book-a-slot/paath"><li className="col">Book a Paath Slot</li> </Link>
            <Link to="/create-event/langar"><li className="col">Book a Langar </li> </Link>
        </>
    )
}

