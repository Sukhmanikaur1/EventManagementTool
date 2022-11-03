import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { toggleEventDetails } from '../actions/actions'

import '../styles/event.css'

const Event = ({ event, setModal }) => {

    let dispatch = useDispatch()
    let history = useHistory()

    const handleClick = () => {
        // dispatch(toggleEventDetails(event))
        // history.replace(`/events/${event.eventid}`)
        setModal(event)
    }

    const displayDate = () => {
        if (event.type === 'langar') {
            let { mm, yy, dd } = event.langarDate
            return `${mm}/${dd}/${yy}` 
        }
        else {
            let sd = event.startdate.split("-")
            return `${sd[1]}/${sd[2].slice(0,2)}/${sd[0]}`
        }
    }

    return ( 
        <div className='event' onClick={handleClick}>
            <h3>{event.eventplace}</h3>
            <h4>{displayDate()}</h4>
            <h5>{event.eventtype}</h5>
        </div>
    );
}
 
export default Event;