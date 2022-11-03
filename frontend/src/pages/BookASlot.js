import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'

import '../styles/bookSlot.css'

const BookASlot = () => {

    let paaths = useSelector((state) => state.events.events.filter((e) => e.eventtype === "paath"));

    let history = useHistory()
    let path = history.location.pathname

    const handlePaathClick = (e) => {
        history.push(`/events/${e.target.id}`)
    }

    return (
        <section className='book-a-slot'>
            {path.includes('paath') ?
                <>
                    <h1>Paath events to choose from:</h1>
                    <section>
                        {paaths.map(e => <p key={e.eventid} id={e.eventid} onClick={handlePaathClick}>{e.eventname}</p>)}
                    </section>
                </>
            :
                <>
                    <h1>Choose the event type:</h1>
                    <div><Link to="/book-a-slot/paath">Paath</Link></div>
                    <div><Link to="/create-event/langar">Langar</Link></div>
                </>
            }   
        </section>
    )
}

export default BookASlot
