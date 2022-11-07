import React, { useState, useEffect } from 'react';

import Calendar from 'react-calendar';

import '../styles/calendar.css'
import '../styles/newEvent.css';

import LangarModal from '../components/LangarModal';

const LangarCalendar = (props) => {

    let [calendar, setCalendar] = useState(new Date())
    let [modal, setModal] = useState(false)

    let [event, setEvent] = useState({
        langarDate: { dd: '', mm: '', yy: '' },
        bookedDetails: {},
        bookedDays: {},
        selectedDay: { dd: '', mm: '', yy: '' }
    })

    useEffect(() => {
        // Determine default dates for Langar type events
        // Using a functional update because otherwise it complains. Besides that nothing different going on here
        // console.log({ dd: currentDay(), mm: currentMonth(), yy: currentYear() })
            setEvent(prevEvent => ({
                ...prevEvent,
                langarDate: formatLangarDate(new Date()),
            }))
       

    }, [])


    useEffect(() => {
        // Handles filtering of available days and months for langar events when necessary 
      

            let bookedDays = {}

            // Find days that have aleady been taken. 
            for (let i = 0; i < props.events.length; i++) {

                let ev = props.events[i]
                if (!ev) break
                if (ev.enddate) continue // if it has an end date then it's a paath type event, so skip

                let [yy, mm, dd] = ev.startdate.split('-')
                dd = dd.slice(0,2)

                // Handle days in event month
                if (mm === event.langarDate.mm &&
                    yy === event.langarDate.yy) {
                    bookedDays[dd] = { dd, ev }
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
        return { dd, mm, yy }
    }

    const blank = () => ({ mm: '', yy: '', dd: '' })

    const handleChange = (e, e2) => {
        let name, value;

        if (e.target) {
            name = e.target.name
            value = e.target.value
        } else {
            // handles selection of a date in the calendar
            let day = e.getDate()
            day = day < 10 ? '0' + day : day
            if (day in event.bookedDays) {
                // detailsRef.current.classList.add('active')
                setModal(event.bookedDays[day])
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

    let { yy, mm, dd } = event.selectedDay

    return (
        <div className='bk-slot' style={{ backgroundColor: 'inherit' }}>
                <label id="date-langar">
                    <input
                        name="endDate"
                        value={yy && mm && dd ? `${yy}-${mm}-${dd}` : ''}
                        type="date"
                        disabled
                    />
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

            {modal && <LangarModal event={modal} closeModal={setModal} />}

        </div>
    )
}

export default LangarCalendar;