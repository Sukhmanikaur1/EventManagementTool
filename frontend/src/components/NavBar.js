import React,{useEffect} from 'react';
import { Link ,useHistory} from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();
    useEffect(() => {
        // Update the document title using the browser API
        history.listen((location) => { 
            console.log(location.state)
         }) 
      },[history]);
    return (
        <nav>
            <ul>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/new-event">New Event</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;