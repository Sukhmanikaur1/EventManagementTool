import React, { useRef, useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';

import styles from'../styles/PersonalEventModal.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const PersonalEventEditModal = ({ handleDeletePerosnalEvents,handleUpdatePerosnalEvents,personalEvent, closeModal , show}) => {
    // console.log(personalEvent)
    const startTime = useRef()
    const endTime= useRef()
    const data = personalEvent
    const [event,setEvent]=useState(personalEvent)
    // console.log(data)
    const [eventphonenumber,setEventPhoneNumber]=useState(data.eventphonenumber)
    const [hostphonenumber,setHostPhoneNumber]=useState(data.hostphonenumber)
    let date = new Date(data.eventdate)
    let date2 = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
    // console.log(console.log(date2))
    const handleOnChange = (e)=>{
        // console.log(e.target)
        if (e.target.name==='eventphonenumber' || e.target.name==='hostphonenumber'){
          let { value } = e.target
        let lstChTypd = value.slice(-1)
        
        if (!/[0-9]/.test(Number(lstChTypd)) && lstChTypd !== '-' && lstChTypd) return
        if (value.length === 13) return

        if (value.length === 4 && !value.includes('-')) {
            value = value.slice(0, 3) + '-' + value.slice(3)
        } else if (value.length === 8 && value[7] !== '-') {
            value = value.slice(0, 7) + '-' + value.slice(7)
        }
      if (e.target.name==='eventphonenumber')
      {
        setEventPhoneNumber(value)
        setEvent({...event, [e.target.name] : value})
      }
      else if (e.target.name==='hostphonenumber')
      {
        setHostPhoneNumber(value)
        setEvent({...event, [e.target.name] : value})
      }
    }
    else{
      if(e.target.name==='starttime' || e.target.name==='endtime'){
        if (e.target.value.length>5) return

        let time = e.target.value
        time = time.replace(/[^0-9]/g, '')
        time = time.replace(/(\d{2})(\d{2})/, "$1:$2")
        setEvent({...event, [e.target.name] : time})
      }
      else{
        setEvent({...event, [e.target.name] : e.target.value})

      }
        

    }
    }
    const handleDelete = ()=>{
      if(window.confirm('Are you sure you want to proceed?'))
      {

        handleDeletePerosnalEvents(event)
      }
    }
    const handleUpdate = ()=>{
        handleUpdatePerosnalEvents(event)
    }
    const turnTimeTo24h=(time)=>{
      
      let [hh,mm,ss]= time.split(':')
      console.log(ss)
      if(ss?.length>2){
        if (ss?.substring(2,ss?.length)==='PM')hh=Number(hh)+12
        console.log(hh)
        return hh+":"+mm

      }
      else {
        return hh+":"+mm
      }
    }
    useEffect(()=>{
      startTime.current.value= turnTimeTo24h(data.starttime)
      endTime.current.value =turnTimeTo24h(data.endtime)

    },[])
    console.log(startTime)
    const handleOnChangeStartTime = (e)=>{
      // startTime=turnTimeTo24h(e.target.value)
      console.log(e.target.value)
      setEvent({...event,starttime:e.target.value})
    }
    const handleOnChangeEndTime = (e)=>{
      // endTime=turnTimeTo24h(e.target.value)
      setEvent({...event,endtime:e.target.value})
    }
    return ( <> 
           <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={()=>closeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onChange={handleOnChange}>
          <span>Event Name: </span><input onChange={handleOnChange} type="text" name="eventname" defaultValue={data.eventname} value={event.eventname}/><br/>
          <span>Host Name: </span><input onChange={handleOnChange} type="text" name="hostname" defaultValue={data.hostname} value={event.hostname}/><br/>
          <span>Host Phone Number:</span><input onChange={handleOnChange} type="text" name="hostphonenumber"  defaultValue={hostphonenumber} value={hostphonenumber}/><br/>
          <span>Event Date: </span><input onChange={handleOnChange} type="date" name="eventdate" defaultValue={date2} value={event.eventdate}/><br/>
          <span>Event Start Time: </span><input onChange={handleOnChange} type="time" name="starttime" ref={startTime} defaultValue="00:00"value={startTime?.current?.value}/><br/>
          <span>Event End Time: </span><input onChange={handleOnChange} type="time" name="endtime" ref={endTime}defaultValue={"00:00"} value={endTime?.current?.value}/><br/>
          <span>Event Place: </span><input onChange={handleOnChange} type="text" name="eventplace" defaultValue={data.eventplace} value={event.eventplace}/><br/>
          <span>Event Address: </span><input onChange={handleOnChange} type="text" name="eventaddress" defaultValue={data.eventaddress} value={event.eventaddress}/><br/>
          <span>Event Phone Number:</span><input onChange={handleOnChange} type="text" name="eventphonenumber" defaultValue={eventphonenumber} value={eventphonenumber}/><br/>
          <span>Event Description: </span><input onChange={handleOnChange} type="text" name="eventdescription" defaultValue={data.eventdescription} value={event.eventdescription}/><br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={()=>handleUpdate(false)}>
            Update
          </Button>
          <Button variant="danger" onClick={()=>handleDelete(false)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={()=>closeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    );
}
 
export default PersonalEventEditModal;