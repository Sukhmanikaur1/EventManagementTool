import React, { useState } from 'react';
import Event from '../components/Event';

import { useSelector } from 'react-redux'

import '../styles/manageEvents.css'
import { Link } from 'react-router-dom';
import EventModal from '../components/EventModal';

const Events = () => {

    let events = useSelector(state => state.events.events)
    // let details = useSelector(state => state.events.details)
    const role = useSelector(state => state.users.role)

    let [modal, setModal] = useState(false)

    const renderEvents = (type) => {
        return events
                  .filter((e) => e.eventtype === type)
                  .map(event => 
                    <Event 
                        key={event.eventid} 
                        event={event} 
                        setModal={setModal}
                    />
                  )
    }

    return (
        <div className="manage-evt">

            <div className='cr-ev-btn-contain'>
                {role !== 'guest' &&
                    <Link to="/create-event/paath" style={{ textDecoration: 'none' }}>
                        <li className="col cr-ev-btn">Create Event</li> 
                    </Link>
                }
            </div>

            <div className='manage-both'>
                <div className='manage-p'>
                    <h2 id="h-p">Paath Events</h2>
                    {renderEvents('paath')}
                </div>
                
                
                {/* <div className='manage-l'>
                    <h2 id="h-l">Langar Events</h2>
                    {renderEvents('langar')}
                </div> */}
            </div>
            
            {modal && <EventModal event={modal} closeModal={setModal} />}

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