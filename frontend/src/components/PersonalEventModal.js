import React, { useRef, useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';

import styles from'../styles/PersonalEventModal.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const PersonalEventModal = ({ personalEvent, closeModal , show}) => {
    console.log(personalEvent.data[personalEvent.id])
    const data = personalEvent.data[personalEvent.id]
    console.log(data)
    let startTime= new Date(data.starttime)
    console.log(data.eventdate)
    let date = new Date(data.eventdate)
    console.log(date)
    // date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear()
    let date2 = data.eventdate +" "+data.starttime+'-'+data.endtime
    console.log(console.log(date2))
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
          <span>Event Name: {data.eventname}</span><br/>
          <span>Host Name: {data.hostname}</span><br/>
          <span>Host Phone Number:{data.phonenumber}</span><br/>
          <span>Event Date: {date2}</span><br/>
          <span>Event Place: {data.eventplace}</span><br/>
          <span>Event Address: {data.eventaddress}</span><br/>
          <span>Event Description: {data.eventdescription}</span><br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>closeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    );
}
 
export default PersonalEventModal;