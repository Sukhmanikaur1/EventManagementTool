import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams,useLocation } from 'react-router-dom'
import {getLangarEvents} from '../actions/langarActions'
import {getPersonalEvents} from '../actions/personalActions'
import '../styles/eventConfirm.css'

const EventConfirmation = () => {
    const {state} = useLocation()
    console.log(state)
    const dispatcher=useDispatch()
    let { id } = useParams()
    // for development... can remove later... basically checking if it's an auto-incremented number id 
    // or a string of characters like a uuid (MongoDB)
    id = isNaN(Number(id)) ? id : Number(id)
    const [event, setEvent]= useState({})
    const temp = useSelector(e => e.events.events.filter(ev => ev.eventid === id)[0]) // .filter(ev => ev.eventid === Number(id))[0]
    console.log(temp)
    const eventassignment =()=>{
    setEvent( temp) // .filter(ev => ev.eventid === Number(id))[0]
    
    if(temp?.eventtype !== "langar" && temp?.eventtype !== "paath"&&sessionStorage.getItem("last")==="personal"){
        dispatcher(getPersonalEvents())
        let temp1=JSON.parse(sessionStorage.getItem('personalEvents'))
        setTimeout(() =>{temp1=JSON.parse(sessionStorage.getItem('personalEvents'))
        console.log('temp1')
        console.log(temp1)
        if(state) temp1=[state]
        setEvent(temp1[temp1.length-1])
        setTimeout(()=>setEvent({...temp1[temp1.length-1],
            eventtype:"Personal",
            startdate: event?.eventdate,
            eventphone: event.phonenumber
        }),500)},800
        )
        
        
        console.log(event)
 
    }
    if(temp?.eventtype !== "personal" && temp?.eventtype !== "paath"&&sessionStorage.getItem("last")==="langar"){
        dispatcher(getLangarEvents())
        let temp2=JSON.parse(sessionStorage.getItem('langar'))
        setTimeout(() =>{temp2=JSON.parse(sessionStorage.getItem('langar'))
        console.log('temp2 langar')
        console.log(temp2)
        if(state) temp2=[state]
        console.log(temp2)
        setEvent(temp2[temp2.length-1])
        setTimeout(()=>setEvent({...temp2[temp2.length-1],
            eventtype:"langar",
            startdate:temp2[temp2.length-1].date,
            eventphone:temp2[temp2.length-1].eventphone,
            eventplace:temp2[temp2.length-1].orgname
        }),300)},500
        )
        
        
        console.log(event)
 
    }
    }
    useEffect(() => {
        eventassignment()
    },[])
    return (
        <main className="event-confirmation-pg">
            <div>
                <h1>Event Successfully Created</h1>
                {/* <h2>Confirmation #</h2> */}
                <ul>
                    <li><span>Event Type:</span> <span>{event?.eventtype}</span></li>                 
                    <li><span>Start Date:</span> <span>{event?.eventtype==="Personal"?event?.eventdate:event?.startdate?.slice(0, 10)}</span></li>
                    {event?.eventtype === 'paath' && 
                        <li>
                            <span>End Date:</span>  
                            <span>{event?.enddate?.slice(0, 10)}</span>
                        </li>
                    }
                    {event?.eventtype === 'Personal' &&<>
                    <li><span>Host Name:</span> <span>{event?.hostname}</span></li>
                    <li><span>Event Name:</span> <span>{event?.eventname}</span></li>
                    <li><span>Start Time:</span> <span>{event?.starttime}</span></li>
                    <li><span>End Time:</span> <span>{event?.endtime}</span></li>
                    </>}
                    <li><span>Location:</span> <span>{event?.eventplace}</span></li>
                    <li><span>Address:</span> <span>{event?.eventaddress}</span></li>
                    <li><span>Phone Number:</span> <span>{event?.eventtype==="Personal"?event?.phonenumber:event?.eventphone}</span></li>
                </ul>
                <button className='done'><Link to="/">Done</Link></button>
            </div>
        </main>
    )
}

export default EventConfirmation
