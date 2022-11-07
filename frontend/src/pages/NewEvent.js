import React, { useState, useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuid } from 'uuid'

import { addEvent } from '../actions/actions';

import { database } from '../services/EventService';

import '../styles/calendar.css'
import '../styles/newEvent.css';
import LangarModal from '../components/LangarModal';
import LangarCalendar from '../components/LangarCalendar';

const NewEvent = () => {

    let [modal, setModal] = useState(false)

    const events = useSelector(state => state.events.events)

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { eventtype } = useParams()

    useEffect(() => {
        setEvent(prevState => ({ ...prevState, type: eventtype }))
    }, [eventtype])

    let user = useSelector(state => state.users.currentUser)

    let [event, setEvent] = useState({
        user: user,
        type: eventtype ? eventtype : '',
        startDate: '',
        endDate: '',
        place: '',
        name: '',
        address: '',
        langarDate: { dd: '', mm: '', yy: '' },
        bookedDetails: {},
        bookedDays: {},
        selectedDay: { dd: '', mm: '', yy: '' }
    })

    let [phone, setPhone] = useState('')

    useEffect(() => {
        // Determine default dates for Langar type events
        // Using a functional update because otherwise it complains. Besides that nothing different going on here
        // console.log({ dd: currentDay(), mm: currentMonth(), yy: currentYear() })
        if (event.type === "langar") {
            setEvent(prevEvent => ({
                ...prevEvent,
                langarDate: formatLangarDate(new Date()),
            }))
        } else {
            setEvent(prevEvent => ({ ...prevEvent, selectedDay: blank(), langarDate: blank() }))
        }

    }, [event.type])

    useEffect(() => {
        setEvent(prevEvent => ({ ...prevEvent, endDate: '' }))
    }, [event.startDate])

    const formatLangarDate = (date) => {
        let mm = date.getMonth() + 1
        let yy = date.getFullYear()
        let dd = date.getDate()
        if (mm < 10) mm = '0' + mm
        if (dd < 10) dd = '0' + dd
        dd = String(dd)
        mm = String(mm)
        yy = String(yy)
        return { dd, mm, yy }
    }

    const formatRegular = (date) => `${date.yy}-${date.mm}-${date.dd}`

    const blank = () => ({ mm: '', yy: '', dd: '' })

    const handleChange = (e, e2) => {
        let name, value;

        if (e.target) {
            name = e.target.name
            value = e.target.value
        }

        setEvent({ ...event, [name]: value })
    }
  
    const packageEvent = () => {
        let newEvent = { 
                startdate: event.startDate,
                enddate: event.endDate,
                eventaddress: event.address, 
                eventtype: event.type, 
                eventname: event.name ? event.name : "none",
                eventplace: event.place, 
                eventphone: phone,
                eventstatus: "created"
        }
        
        if (!database)
            newEvent = { ...newEvent, user, eventid: uuid() }

        if (event.type === "langar" && !newEvent.startdate)
            newEvent.startdate = formatRegular(event.selectedDay)

        return newEvent
    }

    const handleSubmit = (e) => {
        e.preventDefault()
     
        let newEvent = packageEvent()

        dispatch(addEvent(newEvent))
 
        navigate(`/create-event/event-confirmation/${newEvent.eventid}`)
    }

    const handlePhone = (e) => {
        let { value } = e.target
        let lstChTypd = value.slice(-1)
        
        if (!/[1-9]/.test(Number(lstChTypd)) && lstChTypd !== '-' && lstChTypd) return
        if (value.length === 13) return

        if (value.length === 4 && !value.includes('-')) {
            value = value.slice(0, 3) + '-' + value.slice(3)
        } else if (value.length === 8 && value[7] !== '-') {
            value = value.slice(0, 7) + '-' + value.slice(7)
        }
        setPhone(value)
    }

    const liftSelectedDate = (selectedDay) => {
        console.log(selectedDay)
        setEvent({ ...event, selectedDay })
    }

    let greyedOutStyle = {
        opacity: ".1",
        pointerEvents: "none"
    }

    let { dd } = event.selectedDay

    let interact = !event.type ? greyedOutStyle : null
    let buttInt = ((event.type === 'langar' && dd) || (event.type === 'paath' && event.startDate && event.endDate)) && event.place && phone && event.address ? null : greyedOutStyle
    let paath = event.type !== "langar"
    let interactMore = (!paath && !dd) || (paath && !event.startDate) ? greyedOutStyle : null

    return (
        <div className='bk-slot'>
        <h1 className='ne-h'>{!event.type ? 'Create an event' : event.type === 'langar' ? `Book a Langar: ` : `Create a Paath event`}</h1>
        <form className="ne-form" onSubmit={handleSubmit}>

             <label > {/* style={eventtype ? greyedOutStyle : null} */}
                Event Type
                <select value={event.type ? event.type : eventtype ? eventtype : 'choose'} onChange={handleChange} name="type" autoFocus>
                    <option value="choose" disabled />
                    <option value="paath">Paath (Prayer)</option>
                    <option value="langar">Langar (Kitchen)</option>
                </select>
            </label>

            {!paath && <LangarCalendar events={events} liftSelectedDate={liftSelectedDate} />}

            {modal && <LangarModal event={modal} closeModal={setModal} />}

            {paath &&
                <label style={interact}>
                    Start Date
                    <input
                        name="startDate"
                        type="date"
                        value={event.startDate}
                        onChange={handleChange}
                    />
                </label>}

            {paath &&
                <label style={interactMore}>
                    End Date
                    <input
                        name="endDate"
                        min={event.startDate}
                        // max={weeksFromNow(2)}
                        type="date"
                        value={event.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>}

            {paath &&
            <label style={interact}> {/* style={interactMore} */}
                Event Name
                <input
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    required
                />
            </label>}

            <label style={interact}>
                Place Name
                <input
                    name="place"
                    value={event.place}
                    onChange={handleChange}
                    required
                />
            </label>

            <label style={interact}>
                Address
                <input
                    name="address"
                    value={event.address}
                    onChange={handleChange}
                    required
                />
            </label>

            <label style={interact}>
                Phone Number
                <input
                    type= "tel"
                    id="number"
                    name="number"
                    value={phone}
                    placeholder="ex: 555-555-5555"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handlePhone} 
                    required
                />
            </label>

            <button style={buttInt} className='create-button'>Create</button>
        </form>
        </div>
    )
}

export default NewEvent;