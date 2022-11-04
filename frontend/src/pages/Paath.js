import React from 'react'
import TimeSlots from '../components/TimeSlots';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import '../styles/paath.css'

const Paath = () => {
    let params = useParams()
    let paath = useSelector((state) => state.events.events.filter((e) => String(e.idEvent) === params.id)[0]);
    console.log(paath)
    return (
        <div>
            {paath &&
                <div className='event-details'>
                    <p className='event-p'><span>{paath.eventplace.toUpperCase()}</span><span>type: {paath.eventtype}</span> <span></span></p>
                    <TimeSlots event={paath} />
                </div>
            }
        </div>
    )
}

export default Paath;