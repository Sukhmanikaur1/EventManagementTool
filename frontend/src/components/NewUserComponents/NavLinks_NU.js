import React from 'react'
import { Link } from 'react-router-dom';
const NavLinks_NU = () => {
    return (
        <>
            <Link to="/"><li className="col">Home</li> </Link>
            <Link to="/about"><li className="col">About</li> </Link>
            <Link to="/contact"><li className="col">Contact</li> </Link>
        </>
    )
}

export default NavLinks_NU