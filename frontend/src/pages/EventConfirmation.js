import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import '../styles/eventConfirm.css'

const EventConfirmation = () => {

    let { id } = useParams()

    // for development... can remove later... basically checking if it's an auto-incremented number id 
    // or a string of characters like a uuid (MongoDB)
    id = isNaN(Number(id)) ? id : Number(id)

    let event = useSelector(e => e.events.events.filter(ev => ev.eventid === id)[0]) // .filter(ev => ev.eventid === Number(id))[0]

    return (
        <main className="event-confirmation-pg">
            <div>
                <h1>Event Successfully Created</h1>
                {/* <h2>Confirmation #</h2> */}
                <ul>
                    <li><span>Event Type:</span> <span>{event?.eventtype}</span></li>                 
                    <li><span>Start Date:</span> <span>{event?.startdate?.slice(0, 10)}</span></li>
                    {event?.eventtype === 'paath' && 
                        <li>
                            <span>End Date:</span>  
                            <span>{event?.enddate?.slice(0, 10)}</span>
                        </li>
                    }
                    <li><span>Location:</span> <span>{event?.eventplace}</span></li>
                    <li><span>Address:</span> <span>{event?.eventaddress}</span></li>
                    <li><span>Phone Number:</span> <span>{event?.eventphone}</span></li>
                </ul>
                <button className='done'><Link to="/">Done</Link></button>
            </div>
        </main>
    )
}

export default EventConfirmation
