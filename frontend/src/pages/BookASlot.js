import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {getAllPaathEvents} from '../../src/services/PaathService'
import '../styles/bookSlot.css'

const BookASlot = () => {

    // let paaths = useSelector((state) => state.events.events.filter((e) => e.eventtype === "paath"));
    const [paaths, setPaaths]=useState([])
    let navigate = useNavigate()
    let location = useLocation()
    let path = location.pathname

    const handlePaathClick = (e) => {
        navigate(`/events/${e.target.id}`)
    }
    const getAllPaaths=async ()=>{
        const res = await getAllPaathEvents()
        console.log(res)
        if(res?.data?.code==='SUCCESS'){
            console.log(res?.data?.data)
            setPaaths(res?.data?.data)
        }

    }
    useEffect(()=>{
        getAllPaaths()
    },[])
    return (
        <section className='book-a-slot'>
            {path.includes('paath') ?
                <>
                    {paaths.length ? 
                        <>
                            <h1>Paath events to choose from:</h1> 
                            <section>
                                {paaths.map(e => <p key={e.idPaath} id={e.idPaath} onClick={handlePaathClick}>{e.eventname}</p>)}
                            </section>
                        </>
                        : 
                        <h1>No paath events to choose from</h1>
                    }
                </>
            :
                <>
                    <h1>Choose the event type:</h1>
                    <div><Link to="/book-a-slot/paath">Paath</Link></div>
                    <div><Link to="/create-event/langar">Langar</Link></div>
                </>
            }   
        </section>
    )
}

export default BookASlot
