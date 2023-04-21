import React, { useState, useEffect, useRef } from 'react';
import {createNewLangarEvent} from '../actions/langarActions'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getAllPaathEvents, addNewpaatheventInBackend,updateOnePaathEvent, deleteOnePaathEvent} from '../services/PaathService'

import { v4 as uuid } from 'uuid'
import {createNewPersonalEvent} from '../actions/personalActions'
import { addEvent } from '../actions/actions';
import Calendar from 'react-calendar';
import { database } from '../services/EventService';
import '../styles/calendar.css'
import '../styles/newEvent.css';
import LangarModal from '../components/LangarModal';
import LangarCalendar from '../components/LangarCalendar';
import { getLangarEvents } from "../actions/langarActions";
import { getPaathEvents, createNewPaathEvent } from '../actions/paathActions';

import {getAllEvents} from "../services/LangarEventService";
const NewEvent = () => {
    const [langarEventsData,setLangarEventsData]= useState()
    let [modal, setModal] = useState(false)
    const [personalEvents, setPersonalEvents] = useState([])
    // const events = useSelector(state => state.events.events)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { eventtype, tokenId } = useParams()
    const assignLangarEvents = async() => {
        dispatch(getLangarEvents())
        let res = await getAllEvents()
        
        console.log(res.data.code==="SUCCESS")
        console.log(sessionStorage.getItem('langar'))
        if(sessionStorage.getItem('langar')){
            setLangarEventsData(JSON.parse(sessionStorage.getItem('langar')))
            
        }
        console.log("langarEventsData")
        console.log(langarEventsData)
        if(res?.data?.code==="SUCCESS"){
            setLangarEventsData(res.data.data)
        }
        
      }
    useEffect(() => {
        setEvent(prevState => ({ ...prevState, type: eventtype }))
        if(event.eventtype==="langar")
        assignLangarEvents()
    }, [eventtype])
    let user = useSelector(state => state.users.currentUser)
    if(!user?.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
    user = JSON.parse(sessionStorage.getItem('user'))

    let [event, setEvent] = useState({
    
        user: user.fname+" "+user.lname,
        type: eventtype ? eventtype : 'paath',
        startDate: '',
        endDate: '',
        place: '',
        name: '',
        address: '',
        langarDate: { dd: '', mm: '', yy: '' },
        bookedDetails: {},
        bookedDays: {},
        selectedDay: { dd: '', mm: '', yy: '' },
        startTime:0,
        endTime:0,
        hostName:"",
        eventDescription:"",
        startTime:new Date(),
        endTime: new Date(),
        phone:"",
    })

    let [phone, setPhone] = useState('')
    useEffect(()=>{
        assignLangarEvents()
    },[])
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

    const handleChange = (e) => {
        let name, value;
        console.log(e)
        if (e.target) {
            console.log(e.target)
            name = e.target.name
            value = e.target.value
        }

        setEvent({ ...event, [name]: value })
    }
  console.log(event)
    const packageEvent = () => {
        let newEvent = { 
                startdate: event.startDate,
                enddate: event.endDate,
                eventaddress: event.address, 
                eventtype: event.type, 
                eventname: event.name ? event.name : "none",
                eventplace: event.place, 
                eventphone: phone,
                status: "New"
        }
        
        if (!database)
            newEvent = { ...newEvent, user:user.username, eventid: uuid() }

        if (event.type === "langar" && !newEvent.startdate)
            newEvent.startdate = formatRegular(event.selectedDay)

        return newEvent
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let newEvent = packageEvent()
        if(event.type === "langar"&&user?.tokenId){
            dispatch(createNewLangarEvent({
                
                  date:newEvent.startdate,
                  eventaddress: newEvent.eventaddress,
                  orgname: newEvent.eventplace,
                  phonenumber: newEvent.eventphone, 
                  fullName:user.fname+" "+user.lname,
            },user.tokenId))
            dispatch(addEvent(newEvent))
        }
        else if( event.type === "paath"  && user?.tokenId){
            // dispatch(addEvent(newEvent))
            console.log(user.tokenId)
            let newPaathEventList= await addNewpaatheventInBackend(tokenId, {
                    eventname:newEvent.eventname,
                    startdate:newEvent.startdate,
                    enddate:newEvent.enddate,
                    orgname:newEvent.eventplace,
                    eventaddress: newEvent.eventaddress,
                    phonenumber: newEvent.eventphone,
                    status:newEvent.status,
                })
                 console.log(newPaathEventList)
            if(newPaathEventList?.data?.code==="SUCCESS"){
                sessionStorage.setItem("paath",JSON.stringify(newPaathEventList?.data?.data))
                dispatch(addEvent(newEvent))
            }
            // dispatch(createNewPaathEvent({
            //     startdate:newEvent.startdate,
            //     enddate:newEvent.enddate,
            //     orgname:newEvent.eventplace,
            //     eventaddress: newEvent.eventaddress,
            //     phonenumber: newEvent.eventphone,
            //     status:newEvent.status,
            // },user.tokenId))
            // // dispatch(createNewPaathEvent({
            // },user.tokenId))
        }
        else if( event.type === "personal" && user?.tokenId){
            let valid= true
            personalEvents?.map(evnt=>{ console.log(evnt.starttime)
                console.log(event.startTime) 
                if (evnt.eventdate==event.startDate) {
                    if(Number(event.startTime.substr(0,2))>12){
                        setEvent({...event, startTime:(Number(event.startTime.substr(0,2))-12)+event.startTime.substr(2)+"PM"})
                    }
                    if(evnt.starttime.substr(0,5)>= event.startTime.substr(0,5)&&event.startTime.substr(0,5)<=evnt.endtime.substr(0,5)){
                        console.log(evnt.starttime+"here")
                        valid= false
                    }
                    else if(evnt.endtime.substr(0,5)== event.endTime)
                    valid= false
                    console.log(true+" same startdate start time")
                
                }
                else{ console.log("different start datte")}})
                console.log(valid)
            const currentEvent ={phonenumber:phone,
                hostname: event.hostname,
                eventdate: event.startDate,
                eventdescription: event.eventdescription,
                eventaddress: event.address,
                eventplace: event.place,
                eventname: event.name,
                eventtimestart: event.startTime,
                eventtimeend: event.endTime,
            }
            
            dispatch(createNewPersonalEvent(user?.tokenId,currentEvent))
            
        }
        setTimeout(() =>navigate(`/create-event/event-confirmation/${newEvent.eventid}`),500)
        
    }

    const handlePhone = (e) => {
        let { value } = e.target
        let lstChTypd = value.slice(-1)
        
        if (!/[0-9]/.test(Number(lstChTypd)) && lstChTypd !== '-' && lstChTypd) return
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
    let buttInt = ((event.type === 'langar' && dd) || (((event.type === 'paath' && event?.endDate) ||event?.type === 'personal')&& event?.startDate )) && event.place && phone && event.address ? null : greyedOutStyle
    let paath = event.type==="paath"?"paath":false
    let personal = event.type ==="personal"?"personal":false;

    let interactMore = (!(paath||personal) && !dd) || ((paath==="paath"||personal==='personal') && !event.startDate) ? greyedOutStyle : null
    let todayDate= new Date().toISOString().split('T')[0]
    let personalTodaydate=new Date()
    personalTodaydate.setDate(personalTodaydate.getDate()+1)
    personalTodaydate= personalTodaydate.toISOString().split('T')[0]
    console.log(todayDate)
    return (
        <div className='bk-slot'>
        <h1 className='ne-h'>{!event.type ? 'Create an event' : event.type === 'langar' ? `Book a Langar: ` : `Create a Paath event`}</h1>
        <div className='containerdiv-bkslot'>
        <div className='langar-text'>
        {event.type === 'langar'?<span>In Sikhism, a langar (Punjabi: ਲੰਗਰ, 'kitchen') is the community kitchen of a gurdwara, which serves meals to all free of charge, regardless of religion, caste, gender, economic status, or ethnicity. People sit on the floor and eat together, and the kitchen is maintained and serviced by Sikh community volunteers.The meals served at a langar are always lacto-vegetarian.

</span>:<></>}
        </div>
        <form className="ne-form" onSubmit={handleSubmit}>

             <label > {/* style={eventtype ? greyedOutStyle : null} */}
                Event Type
                <select disabled={user.role!=="admin"} value={event.type ? event.type : eventtype ? eventtype : 'paath'} onChange={handleChange} name="type" autoFocus>
                    
                    {user.role==="admin"&&<option value="paath">Paath (Prayer)</option>}
                    {user.role==="admin"&&<option value="personal">Personal</option>}
                    <option value="langar">Langar (Kitchen)</option>
                </select>
            </label>
        
            {!(paath==="paath" ||personal==="personal") && <LangarCalendar events={langarEventsData} liftSelectedDate={liftSelectedDate} />}
            
            {modal && <LangarModal event={modal} closeModal={setModal} />}

            {paath ==="paath" &&
                <label style={interact}>
                    Start Date
                    <input
                        name="startDate"
                        type="date"
                        value={event.startDate}
                        onChange={handleChange}
                        min={todayDate}
                    />
                </label>}

            {paath ==="paath" &&
                <label style={interactMore}>
                    End Date
                    <input
                        name="endDate"
                        type="date"
                        value={event.endDate}
                        onChange={handleChange}
                        min={event.startDate}
                    />
                    
                </label>}
                {personal &&
                <label >
                    {/* style={interactMore}> */}
                    Start Date
                    <input
                        name="startDate"
                        type="date"
                        value={event.startDate}
                        onChange={handleChange}
                        min={personalTodaydate}
                    />
                    
                </label>}
                                {personal &&
                <label >
                {/* // style={interactMore}> */}
                    Start Time
                    <input
                        name="startTime"
                        type="time"
                        step="3600"
                        value={event.startTime}
                        onChange={handleChange}
                        
                    />
                    
                </label>}
                {personal &&
                <label >
                    {/* style={interactMore}> */}
                    End Time
                   
                    <input
                        name="endTime"
                        type="time"
                        step="3600"
                        value={event.endTime}
                        onChange={handleChange}
                        min={event.startTime}
                    />
                    
                </label>}
                {personal==='personal'&&<label style={interact}>
                Host Name
                <input
                    name="hostname"
                    value={event.hostname}
                    onChange={handleChange}
                    required
                />
            </label>}
            {personal==='personal'&&<label style={interact}>
                Host Phone Number
                <input
                    name="hostphone"
                    value={event.hostphone}
                    onChange={handleChange}
                    required
                />
            </label>}

            {paath==="paath" &&
            <label style={interact}> {/* style={interactMore} */}
                Event Name
                <input
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    required
                />
            </label>}
            {personal==="personal" &&
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
            
            {personal==='personal'&&<label style={interact}>
                Event Description
                <input
                    name="eventdescription"
                    value={event.eventdescription}
                    onChange={handleChange}
                    required
                />
            </label>}

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
                Event Phone Number
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
            <div style={{display: 'flex', flexDirection: 'row', alignItems:'center',width:"100%",justifyContent:"space-around"}}>
            <button style={buttInt} className='create-button'>Create</button>
            <button style={buttInt} onClick={()=>navigate('/')} className='create-button'>Cancel</button>

            </div>
            
        </form>
        <div className="langar-text">
        {event.type === 'langar'?<span>In Sikhism, a langar (Punjabi: ਲੰਗਰ, 'kitchen') is the community kitchen of a gurdwara, which serves meals to all free of charge, regardless of religion, caste, gender, economic status, or ethnicity. People sit on the floor and eat together, and the kitchen is maintained and serviced by Sikh community volunteers.The meals served at a langar are always lacto-vegetarian.

</span>:<></>}
        </div>
        </div>
        </div>
    )
}

export default NewEvent;