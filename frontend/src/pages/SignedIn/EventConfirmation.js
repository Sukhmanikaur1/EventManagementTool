import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const EventConfirmation = () => {

    let { id } = useParams()
    let event = useSelector(e => e.events.events.filter(ev => ev.eventid === Number(id))[0])

    return (
        <main className="event-confirmation-pg">
            <div>
                <h1>Event Successfully Created</h1>
                {/* <h2>Confirmation #</h2> */}
                <ul>
                    <li><span>Event Type:</span> <span>{event?.eventtype}</span></li>                 
                    <li><span>Start Date:</span> <span>{event?.startdate?.slice(0, 10)}</span></li>
                    <li><span>End Date:</span>  <span>{event?.enddate?.slice(0, 10)}</span></li>
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
