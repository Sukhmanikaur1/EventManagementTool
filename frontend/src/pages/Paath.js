import React,{useEffect,useState} from 'react'
import TimeSlots from '../components/TimeSlots';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


import {getAllPaathEvents} from '../../src/services/PaathService'
import '../styles/paath.css'

const Paath = () => {
    let params = useParams()
    const [paaths, setPaaths]=useState([])
    const [paath,setPaath]=useState({})
    const getAllPaaths=async ()=>{
        const res = await getAllPaathEvents()
        console.log(res)
        if(res?.data?.code==='SUCCESS'){
            setPaaths(res?.data?.data)
            setPaath(res?.data?.data?.filter(e=> e.idPaath == params.id)[0])
        }

    }
    useEffect(()=>{
        getAllPaaths()
    }  ,[] )
    // let paath = useSelector((state) => state.events.events.filter((e) => String(e.eventid) === params.id)[0]);
    // let paath = paaths.filter(e=>e.idPaath === params.id)[0]
    console.log("paath",paath,"paaths",paaths,"params.id" ,params.id)
    return (    
        <div>
            {paath &&
                <div className='event-details'>
                    <p className='event-p'><span>{paath?.eventplace?.toUpperCase()}</span><span></span> <span></span></p>
                    {paath?.enddate&&<TimeSlots event={paath} />}
                </div>
            }
        </div>
    )
}

export default Paath;