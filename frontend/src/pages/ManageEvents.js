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
                    <Link to="/create-event" style={{ textDecoration: 'none' }}>
                        <li className="col cr-ev-btn">Create Event</li> 
                    </Link>
                }
            </div>

            <h2 id="h-p">{events.length ? "Paath Events" : "No events to manage"}</h2>

            <div className='manage-both-contain'>
                <div className='manage-both'>
                    <table className="table manage-p">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Place</th>
                                <th scope="col">Starts</th>
                                <th scope="col">Ends</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderEvents('paath')}
                        </tbody>
                    </table>
                </div>
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