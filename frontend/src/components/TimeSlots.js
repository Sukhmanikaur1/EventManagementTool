import React, { useState, useEffect, useRef } from 'react'
import SlotModal from './SlotModal'

// import { v4 as uuid } from 'uuid'
import {getAllPaathEvents} from '../services/BookPaathSlotService'
import { useDispatch, useSelector } from 'react-redux'
import { setSlot } from '../actions/slotActions'

import MessageModal from '../components/MessageModal'

const TimeSlots = ({ event }) => {
    
    
    console.log("event",event)
        const [showModalMessage, setShowModalMessage]= useState(false)
      const [modalMessage, setModalMessage] = useState('')
    let { startDate, enddate } = event

    let slotDateRef = useRef({})
    let slotTimeRef = useRef({})
    let slotDisableRef = useRef({})
    let search = window.location.search;
    let params = new URLSearchParams(search);
    console.log(params)
    const id = params.get("id");
    console.log(id)
    let rawDateRange = new Date(enddate) - new Date(startDate)
    console.log("rawDateRange",rawDateRange,"new Date(startdate)",new Date(startDate),"new Date(enddate)",new Date(enddate))
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

    const [slots, setSlots] = useState([])//useSelector(state => state.slots.slots.filter(s => s.eventid === event.id))]
    // let slots = []
    let user = useSelector(state => state.users.currentUser)
    user= JSON.parse(sessionStorage.getItem('user'))
    let dispatch = useDispatch()
    const getBookedSlots=async()=>{
        await getAllPaathEvents(event.idPaath,user.tokenId).then(res=>{
            console.log("res",res)
            if(res?.data?.code==='SUCCESS'){
                console.log("res.data.data",res?.data?.data)
                setSlots(res?.data?.data)
            }
        })
    }
    useEffect(()=>{
        getBookedSlots()
    },[])
    useEffect(() => {

        // won't be null with database... 
        // but if null parsed local storage would be the value
        dispatch(setSlot(null))
     
        let currentDate = new Date(startDate);
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

    }, [days, dispatch, startDate, amountOfRows, ])
    useEffect(()=>{
        console.log("slots",slots)
        getBookedSlots()
    },[modal]
    )

    // getBookedSlots()
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
        console.log("slots",slots,time.trim(" "),date.trim(" "))
        // Otherwise, try to find the info associated with the slot clicked
        let currentSlot = slots.filter(s => s.time === time.trim(" ") && s.date === date.trim(" "))[0]
        console.log("currentSlot",currentSlot)
        if (currentSlot) {
            // Grant access only to a logged in user who created it originally
            
            if (currentSlot.User?.email === user?.username|| user?.role==="admin") {
                console.log("here i am here")
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
                {slot?.email===user.username?<p className='plus-symbol'><span>-</span></p>:<></>}
                <p className='s-deets'>{slot.fullName}</p>
                <p className='s-deets'>{slot.phonenumber}</p>
                {/* <p className={`minus-symbol ${slot.user.username !== user.username ? 'not-cur-user' : 'cur-user-yes'}`}></p> */}
            </div>
        )
    }

    const determineBooked = (row, col) => {
        if (row === 0 || col === 0) return
        let date = slotDateRef.current[`${col}`]
        let time = slotTimeRef.current[`${row}`]
       
        let currentSlot = slots.filter(s => s.time === time && s.date === date && s.eventId===event.eventid )[0]
        console.log(currentSlot)
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
            {modal &&(modal.viewOnly?(modal.currentSlot?false:true):true)&& <SlotModal event={event} setModalMessage={setModalMessage} setShowModalMessage={setShowModalMessage} slot={modal} closeModal={setModal} />}
            {showModalMessage&& <MessageModal message={modalMessage} closeModal={setShowModalMessage} show={showModalMessage}/>}
            
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