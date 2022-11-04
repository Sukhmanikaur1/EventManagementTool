import React, { useState } from 'react';
import Event from '../components/Event';

import { useSelector } from 'react-redux'

import '../styles/manageEvents.css'
import { Link } from 'react-router-dom';
import EventModal from '../components/EventModal';

const Events = () => {

    let events = useSelector(state => state.events.events.filter((e) => e.eventtype === 'paath'))
    // let details = useSelector(state => state.events.details)
    const role = useSelector(state => state.users.role)

    let [modal, setModal] = useState(false)

    const renderEvents = (type) => {
        return events
                  .map(event => 
                    <Event 
                        key={event.eventid} 
                        event={event} 
                        setModal={setModal}
                    />
                  )
    }
console.log(events)
    return (
        <div className="manage-evt">

            <div className='cr-ev-btn-contain'>
                {role !== 'guest' &&
                    <Link to="/create-event" style={{ textDecoration: 'none' }}>
                        <li className="col cr-ev-btn">Create Event</li> 
                    </Link>
                }
            </div>

            <div id='me-contain'>
                {events.length ? 
                <>
                    <h2 id="h-p">Paath Events</h2>
                
                    <div className='manage-both-contain'>
                        <div className='manage-both'>
                            <table className="table manage-p">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Place</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {renderEvents('paath')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                :
                    <h2 id="h-p">No paath events to manage</h2>
                }
             </div>
         
            {modal && <EventModal event={modal} closeModal={setModal} />}

            {/* Temporary buttons for Local Storage management */}
            <div id='ls-temp-btns'>
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
        </div>
    )
}

export default Events;