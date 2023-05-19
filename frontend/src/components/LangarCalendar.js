import React, { useState, useEffect } from 'react';

import { useDispatch,useSelector } from "react-redux";
// import ConfirmationModal from './ConfirmationModal';
import { deleteEvent, updateEvent } from "../actions/actions";
import { updateLangarEventById,deleteLangarEventById, setLangarEvents } from "../actions/langarActions"
import Calendar from 'react-calendar';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/calendar.css'
import '../styles/newEvent.css';
import LangarModal from '../components/LangarModal';
import {deleteOneLangarEvent} from '../services/LangarEventService'
const LangarCalendar = (props) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [messageConfirmationModal, setMessageConfirmationModal] = useState("are you sure you want to delete langar event?")
    const [resultConfirmationModal, setResultConfirmationModal] = useState(false)
    let user = useSelector(state => state.users.currentUser)
    if(!user?.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
    user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const dispatch=useDispatch();
    let [calendar, setCalendar] = useState(new Date())
    let [modal, setModal] = useState(false)
    console.log("props",props)
    let [event, setEvent] = useState({
        langarDate: { dd: '', mm: '', yy: '' },
        bookedDetails: {},
        bookedDays: {},
        selectedDay: { dd: '', mm: '', yy: '' }
    })
    const callondate = () =>{
        

            let bookedDays = {}
            console.log("props.events LangarCalendar",props?.events)
            // Find days that have aleady been taken. 
            for (let i = 0; i < props?.events?.length; i++) {
                
                let ev = props?.events[i]
                if (!ev) break
                if (ev.enddate) continue // if it has an end date then it's a paath type event, so skip
                console.log("ev")
                console.log(ev.date)
                let [yy, mm, dd] = ev.date.split('-')
                dd = dd.slice(0,2)
                
                // Handle days in event month
                if (mm === event.langarDate.mm &&
                    yy === event.langarDate.yy) {
                        bookedDays[dd] = { dd, ev }
                        console.log(bookedDays)
                    }
                    
                }
                
                setEvent(prevEvent => ({
                    ...prevEvent,
                    bookedDays
                }))
          
            }
    
    useEffect(() => {
        // Determine default dates for Langar type events
        // Using a functional update because otherwise it complains. Besides that nothing different going on here
        // console.log({ dd: currentDay(), mm: currentMonth(), yy: currentYear() })
            setEvent(prevEvent => ({
                ...prevEvent,
                langarDate: formatLangarDate(new Date()),
            }))
            callondate()
           

    }, [])
    useEffect(() => {

        setEvent(prevEvent => ({
            ...prevEvent,
            langarDate: formatLangarDate(new Date()),
        }))
        callondate()
    }, [props.events])

    useEffect(() => {
        // Handles filtering of available days and months for langar events when necessary 
    
            let bookedDays = {}
            
            // Find days that have aleady been taken. 
            for (let i = 0; i < props?.events?.length; i++) {

                let ev = props?.events[i]
                if (!ev) break
                if (ev.enddate) continue // if it has an end date then it's a paath type event, so skip
                console.log("ev")
                console.log(ev.date)
                let [yy, mm, dd] = ev.date.split('-')
                dd = dd.slice(0,2)

                // Handle days in event month
                if (mm === event.langarDate.mm &&
                    yy === event.langarDate.yy) {
                    bookedDays[dd] = { dd, ev }
                    console.log(bookedDays)
                }

            }

            setEvent(prevEvent => ({
                ...prevEvent,
                bookedDays
            }))

        
    }, [event.langarDate, event.langarDate.mm, event.langarDate.yy])

    const formatLangarDate = (date) => {
        let mm = date.getMonth() + 1
        let yy = date.getFullYear()
        let dd = date.getDate()
        if (mm < 10) mm = '0' + mm
        if (dd < 10) dd = '0' + dd
        dd = String(dd)
        mm = String(mm)
        yy = String(yy)
        console.log("here"+dd+mm+yy)
        return { dd, mm, yy }
    }
console.log(event)
    const blank = () => ({ mm: '', yy: '', dd: '' })

    const handleChange = (e, e2) => {
        let name, value;

        if (e.target) {
            name = e.target.name
            value = e.target.value
        } else {
            console.log('inside')
            // handles selection of a date in the calendar
            let day = e.getDate()
            day = day < 10 ? '0' + day : day
            if (day in event.bookedDays) {
                console.log(event.bookedDays[day])
                // detailsRef.current.classList.add('active')
                setModal(event.bookedDays[day])
                console.log(event.bookedDays[day])
                setEvent({ ...event, bookedDetails: event.bookedDays[day], selectedDay: blank() })
                return
            }

            let langarDate = formatLangarDate(e)

            setEvent({ ...event, langarDate, selectedDay: langarDate })

            if (props.liftSelectedDate) {
                props.liftSelectedDate(langarDate)
            }
            return
        }

        setEvent({ ...event, [name]: value })
    }

    const handleBookedDayStyle = ({ date }) => {
        let tileDate = String(date.getDate())
        tileDate = tileDate < 10 ? '0' + tileDate : tileDate
        if (tileDate in event.bookedDays) {
            // console.log('we in')
            return 'booked-day'
        }
        else
            return null
    }

    const handlePreviousOrNext = ({ activeStartDate }) => {
        let langarDate = formatLangarDate(activeStartDate)
        setEvent({ ...event, langarDate })

        if (props.liftSelectedDate) {
            props.liftSelectedDate(langarDate)
        }
    }
    useEffect(() => {},[modal])
    let { yy, mm, dd } = event.selectedDay
    const updateLangar = (events) =>{
        console.log(events)
        console.log(user.tokenId)
        dispatch(updateLangarEventById(user.tokenId, events))
        dispatch(updateEvent(events))
        setModal(false)
        sessionStorage.setItem("last", "langar")
        navigate(`/create-event/event-confirmation/${events.eventid}`,{state:events})
      }
      
      const deleteLangar = async (events) => {
        console.log("events delete",events)

        // setShowConfirmationModal(true)
        // showConfirmationModal && setTimeout(() =>{
        // if (resultConfirmationModal){   
            if(window.confirm("Are you sure you want to delete this event?") === true){
           const res = await deleteOneLangarEvent(user.tokenId, events)
           console.log("res delete",res)
           if (res.status === 200) {
            if (res.data.code ==="SUCCESS"){
                setLangarEvents(res.data.data)
                // setEvent(res.data.data)
                navigate(`/home`)
            }
        }
    }
            setModal(false)
            
            
            
        }

        // })
    //    }
       //event on load ... //
       //when ever an application is loaded it will interact with calendar

       


    return (
        <div className='bk-slot' style={{ backgroundColor: 'inherit' }}>
                <label id="date-langar">
                    {/* <input
                        name="endDate"
                        value={yy && mm && dd ? `${yy}-${mm}-${dd}` : ''}
                        type="date"
                        disabled
                    /> */}
                    <Calendar
                        name={"langarDate"}
                        value={calendar}
                        onChange={setCalendar}
                        minDate={new Date()}
                        maxDetail={"month"}
                        showNeighboringMonth={false}
                        onClickDay={handleChange}
                        tileClassName={handleBookedDayStyle}
                        onActiveStartDateChange={handlePreviousOrNext}
                    />
                </label>
''
            {modal && <LangarModal event={modal} closeModal={setModal} updateLangar= {updateLangar} deleteLangar= {deleteLangar} showConfirmationModal = {showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} messageConfirmationModal={messageConfirmationModal} setResultConfirmationModal={setResultConfirmationModal}/>}
            </div>
    )
}

export default LangarCalendar;