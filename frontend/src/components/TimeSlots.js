import React, { useState, useEffect, useRef } from 'react'
import SlotModal from './SlotModal'

// import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { setSlot } from '../actions/slotActions'


const TimeSlots = ({ event }) => {

    let { startdate, enddate } = event

    let slotDateRef = useRef({})
    let slotTimeRef = useRef({})
    let slotDisableRef = useRef({})

    let rawDateRange = new Date(enddate) - new Date(startdate)
    let rawDaysRange = rawDateRange / 1000 / 60 / 60 / 24
    let daysInitialValue = Number(rawDaysRange.toFixed(0))
    let amountOfRows = 14 // to 6pm

    let [days] = useState(daysInitialValue)
    let [modal, setModal] = useState(false)
    console.log(days)
    let [slotDate, setSlotDate] = useState({})
    let [slotTime, setSlotTime] = useState({})
    let [slotsDisabled, setSlotsDisabled] = useState({})

    let [gridRows] = useState([...Array(amountOfRows)])
    let [gridCols] = useState([...Array(days + 1)])

    let slots = useSelector(state => state.slots.slots.filter(s => s.idEvent === event.id))
    let user = useSelector(state => state.users.currentUser)
    let dispatch = useDispatch()

    useEffect(() => {

        // won't be null with database... 
        // but if null parsed local storage would be the value
        dispatch(setSlot(null))

        let currentDate = new Date(startdate);
        currentDate.setDate(currentDate.getDate() + 1);
    
        let daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        
        let dow = currentDate.getDay()

        // Put this function in the useEffect so it would stop complaining
        // about dependencies
        const calculateDayOfWeek = (row, col) => {
            if (row !== 0 || col === 0) return
            if (dow > 6) dow = 0
            let result = daysOfWeek[dow]
            let month = currentDate.getMonth() + 1
            let dayy = currentDate.getDate()
            currentDate.setDate(currentDate.getDate() + 1);
            if (result === 'Sun') slotDisableRef.current[`${col}`] = true
            if (col && row === 0) {
                dow++
                slotDateRef.current[`${col}`] = `${month}/${dayy} ${result}`
            }   
        }

        let hours = [...Array(amountOfRows)]
        let daysInRange = [...Array(days + 1)]

        for (let row = 0; row < hours.length; row++) {

            for (let col = 0; col < daysInRange.length; col++) {
                calculateDayOfWeek(row, col)
                calculateTimeRow(row, col)
            }
        }

        console.log(slotDateRef.current)
        console.log(slotTimeRef.current)
        console.log(slotDisableRef.current)

        setSlotDate({...slotDateRef.current})
        setSlotTime({...slotTimeRef.current})
        setSlotsDisabled({...slotDisableRef.current})

    }, [days, dispatch, startdate, amountOfRows])

    const calculateTimeRow = (row, col) => {
        if (col !== 0 || row === 0) return
        let baseTime = 5
        let m = row >= 7 ? 'PM' : 'AM';
        let result;
        
        // handles display of 6AM to 12PM
        if (row >= 1 && row <= 7)
            result = (baseTime + row) + m

        // handles display of 1PM to 6PM
        if (baseTime + row > 12)
            result = (baseTime + row) - 12 + m
        
        slotTimeRef.current[`${row}`] = result
    }

    const handleSlotClick = (e) => {
        
        let [row, col] = e.currentTarget.id.split("-")
        let time = slotTime[row]
        let date = slotDate[col]
       
        // Ignore click if it was on a disabled or out of bounds slot
        // ...target is a span and the parent is a div with the class name
        if (!time || !date || e.target.parentElement.className.includes('d-slot')) return

        // Otherwise, try to find the info associated with the slot clicked
        let currentSlot = slots.filter(s => s.time === time && s.date === date)[0]
        if (currentSlot) {
            // Grant access only to a logged in user who created it originally
            if (currentSlot.user === user) {
                modal ? setModal(!modal) : setModal({ row, col, time, date, event, currentSlot })
            }
            else modal ? setModal(!modal) : setModal({ row, col, time, date, event, currentSlot, viewOnly: true })
        } 
        // Because no corresponding info was found for slot, any user can access blank slot
        else {
            modal ? setModal(!modal) : setModal({ row, col, time, date, event })
        }
        console.log(`You clicked on slot ${e.target.id}, which is ${slotTimeRef.current[row]} on ${slotDateRef.current[col]}`)
    }

    // blacking out slots beyond 6AM
    const disabledSlotRange = (row) => row > 1

    const disableOrNot = (row, col) => {
        if (slotDisableRef.current[`${col}`]) {
            if (disabledSlotRange(row)) 
                return 'd-slot'
        }
        return ''
    }

    const slotMiniDetails = (slot) => {
        return (
            <div className={`s-deet ${slot.user !== user ? 'cur-user-no' : ''}`}>
                <p className='s-deets'>{slot.name}</p>
                <p className='s-deets'>{slot.email}</p>
                <p className='s-deets'>{slot.phone}</p>
                <p className={`minus-symbol ${slot.user !== user ? 'not-cur-user' : 'cur-user-yes'}`}><span>-</span></p>
            </div>
        )
    }

    const determineBooked = (row, col) => {
        if (row === 0 || col === 0) return
        let date = slotDateRef.current[`${col}`]
        let time = slotTimeRef.current[`${row}`]
       
        let currentSlot = slots.filter(s => s.time === time && s.date === date)[0]
        
        if (currentSlot) 
            return slotMiniDetails(currentSlot) 
        else if (slotsDisabled[`${col}`] && disabledSlotRange(row))
            return 
        else 
            return <p className='plus-symbol'><span>+</span></p>
    }

    return (
        <div className='t-slots'>
            {gridRows.map((_,i) => {
                return (
                    <div key={i} className={`t-slot-row ${!i ? 'r-dates' : ''}`}>
                        {gridCols.map((_,j) => {
                            return (
                                <div 
                                    key={j} 
                                    id={`${i}-${j}`} 
                                    className={`t-slot-column c-${j} r-${i} ${disableOrNot(i, j)}`}
                                    onClick={handleSlotClick}
                                >
                                    <span className='t-span'>
                                        {!i && slotDate[`${j}`]}
                                        {!j && slotTime[`${i}`]}
                                        {determineBooked(i, j)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            {modal && <SlotModal slot={modal} closeModal={setModal} />}
        </div>
    )
}

export default TimeSlots








/*

let slotTable = [...Array(12)].map((_,i) => {
            return (
                <div key={i} className={`t-slot-row ${!i ? 'r-dates' : ''}`}>
                    {[...Array(days + 1)].map((_,j) => {
                        return (
                            <div 
                                key={j} 
                                id={`${i}-${j}`} 
                                className={`t-slot-column c-${j} r-${i}`}
                                onClick={handleSlotClick}
                            >
                                <span>
                                    {calculateDayOfWeek(i, j)}
                                    {calculateTimeRow(i, j)}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )
        })

        setSlotTable({ slotTable })

*/