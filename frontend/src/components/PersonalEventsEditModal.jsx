import React, { useRef, useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';

import styles from'../styles/PersonalEventModal.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const PersonalEventEditModal = ({ handleDeletePerosnalEvents,handleUpdatePerosnalEvents,personalEvent, closeModal , show}) => {
    console.log(personalEvent)
    const data = personalEvent
    const [event,setEvent]=useState(personalEvent)
    console.log(data)
    let startTime= new Date(data.starttime)
    console.log(data.starttime)
    let date = new Date(data.eventdate)
    let date2 = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
    console.log(console.log(date2))
    const handleOnChange = (e)=>{
        console.log(e.target)
        setEvent({...event, [e.target.name] : e.target.value})
    }
    const handleDelete = ()=>{
        handleDeletePerosnalEvents(event)
    }
    const handleUpdate = ()=>{
        handleUpdatePerosnalEvents(event)
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
          <span>Host Phone Number:</span><input onChange={handleOnChange} type="text" name="phonenumber" min={new Date()} defaultValue={data.phonenumber} value={event.phonenumber}/><br/>
          <span>Event Date: </span><input onChange={handleOnChange} type="date" name="eventdate" defaultValue={date2} value={event.eventdate}/><br/>
          <span>Event Start Time: </span><input onChange={handleOnChange} type="time" name="starttime" defaultValue={data.starttime} value={event.starttime}/><br/>
          <span>Event End Time: </span><input onChange={handleOnChange} type="time" name="endtime" defaultValue={data.endtime} value={event.endtime}/><br/>
          <span>Event Place: </span><input onChange={handleOnChange} type="text" name="eventplace" defaultValue={data.eventplace} value={event.eventplace}/><br/>
          <span>Event Address: </span><input onChange={handleOnChange} type="text" name="eventaddress" defaultValue={data.eventaddress} value={event.eventaddress}/><br/>
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