import React, { useState , useEffect} from 'react';
import Event from '../components/Event';

import { useSelector, useDispatch } from 'react-redux'
import {getAllPaathEvents, addNewpaatheventInBackend,updateOnePaathEvent, deleteOnePaathEvent} from '../services/PaathService'
import '../styles/manageEvents.css'
import { Link } from 'react-router-dom';
import EventModal from '../components/EventModal';
import PersonalEvent from '../components/PersonalEvent'
import {getPersonalEvents, updatePersonalEvents,deletePersonalEvents} from '../actions/personalActions'
// import PersonalEventEditModal from '../components/PersonalEventEditModal'
import PersonalEventEditModal from '../components/PersonalEventsEditModal'
import MessageModal from '../components/MessageModal'
const Events = () => {
    let [modal, setModal] = useState(false)
    let [modalPersonalEvents,setModalPersonalEvents]= useState(false)
    const [personalEvents,setPersonalEvents]=useState([])
    const [paathEvents, setPaathEvents ]=useState([])
    const [showModalMessage, setShowModalMessage]= useState(false)
  const [modalMessage, setModalMessage] = useState('')
    const dispatch = useDispatch()
    let user = useSelector(state => state.users.currentUser)
    // let details = useSelector(state => state.events.details)
    const role = useSelector(state => state.users.role)
    user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const renderEvents = (type) => {
        return paathEvents
                  .map(event => 
                    <Event setModalMessage={setModalMessage}
                        setShowModalMessage={setShowModalMessage}
                        key={event.eventid} 
                        event={event} 
                        setModal={setModal}
                    />
                  )
    }
    
    let personalEventData={}
    const renderPersonalEvents = () => {
    
        return personalEvents
                  .map(event => { personalEventData=event
                    return <PersonalEvent onClick={()=>personalEventData=event} 
                        key={event.personaleventid} 
                        event={event} 
                        setModal={setModalPersonalEvents}
                    />}
                  )
    }
    const getAndSetAllPaathEvents=async ()=>{
        await getAllPaathEvents(user?.tokenId).then(res=>{
            console.log(res?.data?.data)
            if (res?.data?.code ==="SUCCESS"){
                setPaathEvents(res?.data?.data)
            }
        })
    }
    console.log(paathEvents)
    useEffect(() => {
        dispatch(getPersonalEvents())
        setPersonalEvents(JSON.parse(sessionStorage.getItem('personalEvents')))
        getAndSetAllPaathEvents()
    },[])
    
    const compareTime=(event)=>{
        let valid= true
        personalEvents.forEach(evnt=>{ 
            if(event.eventdate==evnt.eventdate) valid= false
            console.log(evnt.eventdate)
            console.log(event.eventdate)
        })
        
        console.log('event valid time'+ valid)
    }
    const handleUpdatePerosnalEvents = (event) => {
        compareTime(event)
        dispatch(updatePersonalEvents(event,user.tokenId))
        setTimeout((()=>{
            setPersonalEvents(JSON.parse(sessionStorage.getItem('personalEvents')))
        }),500)
        setModalPersonalEvents(false)
        setModalMessage('Updated Event.')
    setShowModalMessage(true)
    }
    const handleDeletePerosnalEvents = (event) => {
        compareTime(event)
        dispatch(deletePersonalEvents(event,user.tokenId))
        setTimeout((()=>{
            setPersonalEvents(JSON.parse(sessionStorage.getItem('personalEvents')))
        }),500)
        setModalPersonalEvents(false)
        setModalMessage('Event removed.')
    setShowModalMessage(true)
    }
    console.log(modalPersonalEvents)
    return (
        <div className="manage-evt">

            <div className='cr-ev-btn-contain'>
                {role !== 'guest' &&
                    <Link to={"/create-event/paath/"+user.tokenId} style={{ textDecoration: 'none' }}>
                        <li className="col cr-ev-btn">Create Event</li> 
                    </Link>
                }
            </div>

            <div id='me-contain'>
                {paathEvents.length ? 
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
                                        <th scope="col">Status</th>
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
                <div>
                {personalEvents.length ? 
                <>
                    <h2 id="h-p">Personal Events</h2>
                
                    <div className='manage-both-contain'>
                        <div className='manage-both'>
                            <table className="table manage-p">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Place</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {renderPersonalEvents()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                :
                    <h2 id="h-p">No personal events to manage</h2>
                }
                
                </div>
             </div>
         
            {modal && <EventModal setPaathEvents={setPaathEvents} setModalMessage={setModalMessage} setShowModalMessage={setShowModalMessage} event={modal} closeModal={setModal} tokenId= {user.tokenId}/>}
            {modalPersonalEvents && <PersonalEventEditModal handleDeletePerosnalEvents={handleDeletePerosnalEvents} handleUpdatePerosnalEvents={handleUpdatePerosnalEvents} personalEvent={modalPersonalEvents} closeModal={setModalPersonalEvents} show={modalPersonalEvents}/>}
            {showModalMessage&& <MessageModal message={modalMessage} closeModal={setShowModalMessage} show={showModalMessage}/>}
            {/* Temporary buttons for Local Storage management */}
            {/* <div id='ls-temp-btns'>
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
            </div> */}
        </div>
    )
}

export default Events;