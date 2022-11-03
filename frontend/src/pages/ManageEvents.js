import React from 'react';
import Event from '../components/Event';

import { useSelector } from 'react-redux'

import '../styles/manageEvents.css'
import { Link } from 'react-router-dom';

const Events = () => {

    let events = useSelector(state => state.events.events)
    let details = useSelector(state => state.events.details)

    const renderEvents = (type) => {
        return events.filter((e) => e.eventtype === type).map(event => <Event key={event.eventid} event={event} />)
    }

    const renderModal = () => {
        if (details)
            return null
        else 
            return null
    }

    console.log(events)

    return (
        <div className="manage-evt">

        <Link to="/create-event" style={{ textDecoration: 'none' }}>
            <li className="col cr-ev-btn">Create Event</li> 
        </Link>

            <h2 id="h-p">Paath Events</h2>
            <div className='manage-p'>
                {renderEvents('paath')}
            </div>
            
            <h2 id="h-l">Langar Events</h2>
            <div className='manage-l'>
                {renderEvents('langar')}
            </div>
            
            {renderModal()}

            {/* Temporary buttons for Local Storage management */}
            <button
                className="flush"
                onClick={() => { localStorage.removeItem("events"); alert('Local Storage (events) cleared.') }}
                style={{ padding: "10px", cursor: "pointer" }}
            >
                Clear Local Storage (events)
            </button>
            <button
                className="flush"
                onClick={() => { localStorage.removeItem("slots"); alert('Local Storage (slots) cleared.') }}
                style={{ padding: "10px", cursor: "pointer" }}
            >
                Clear Local Storage (slots)
            </button>
            <button
                className="flush"
                onClick={() => { localStorage.clear(); alert('Local Storage (all) cleared.') }}
                style={{ padding: "10px", cursor: "pointer" }}
            >
                Clear Local Storage (all)
            </button>
        </div>
    )
}

export default Events;