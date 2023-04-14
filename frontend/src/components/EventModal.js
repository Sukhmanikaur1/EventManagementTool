import React, { useRef, useState } from "react";
import Modal from "./Modal";

import "../styles/slotModal.css";
import "../styles/eventModal.css";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../actions/actions";
import {updatePaathEventById, deletePaathEventById,setPaathEvents} from "../actions/paathActions"
import {getAllPaathEvents, addNewpaatheventInBackend,updateOnePaathEvent, deleteOnePaathEvent} from '../services/PaathService'

import MessageModal from "../components/MessageModal"
const EventModal = ({ setModalMessage,setShowModalMessage,event, closeModal , tokenId, setPaathEvents}) => {

  let nameRef = useRef();
  let startRef = useRef();
  let endRef = useRef();
  let placeRef = useRef();
  let addressRef = useRef();
  let phoneRef = useRef();
  let statusRef = useRef();
  let dispatch = useDispatch()
  
  const packageEvent = (event) => ({
    ...event,
    startDate: startRef.current.value,
    enddate: endRef.current.value,
    eventaddress: addressRef.current.value, 
    eventname: nameRef.current.value,
    orgname: placeRef.current.value, 
    phonenumber: phoneRef.current.value,
    status:statusRef.current.value
  })

  const handleSubmit = async(e) => {
    console.log(tokenId)
    e.preventDefault();
    setModalMessage('Updated event')
    setShowModalMessage(true)
    let payload = packageEvent(event)
    dispatch(updateEvent(payload))
    // dispatch(updatePaathEventById(payload, tokenId))
    let paathEvents = await updateOnePaathEvent(tokenId, payload)
 
    console.log(paathEvents)
    
    if (paathEvents?.data?.code ==="SUCCESS"){
      console.log(paathEvents)
        sessionStorage.setItem("paath",JSON.stringify(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        // dispatch(setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[])
        sessionStorage.setItem("last",JSON.stringify("paath"))
    }
    else { console.log("bad call")}
    closeModal(false)
  };
  
  const handleDelete = async() => {
    setModalMessage('Event removed.')
    setShowModalMessage(true)
    
    let payload = packageEvent(event)
    dispatch(deleteEvent(event.eventid))
    let paathEvents = await deleteOnePaathEvent(tokenId, payload)
 
    console.log(paathEvents)
    
    if (paathEvents?.data?.code ==="SUCCESS"){
      console.log(paathEvents)
        sessionStorage.setItem("paath",JSON.stringify(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        // dispatch(setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[])
        sessionStorage.setItem("last",JSON.stringify("paath"))
    }
    else { console.log("bad call")}
    closeModal(false)
  };

  const formatDateForInput = (date) => {
    let mm = date.split('-')[1]
    let dd = date.split('-')[2].slice(0,2)
    let yy = date.split('-')[0]
    return `${yy}-${mm}-${dd}`
  }

// value "11-03-2022" does not conform to the required format, "yyyy-MM-dd".

  return (
      <>
    <Modal>
      <div className="event-modal">
        <div className="event-details" id="em-details">
          <p className="event-p">
            <span>{event.eventname}</span> Event Details
          </p>

          <form  id="em-form">
            <div id='em-labels'>
              <label htmlFor="em-start">Start Date:</label>
              <label htmlFor="em-end">End Date:</label>
              <label id="em-name">Event Name:</label>
              <label htmlFor="em-place">Place:</label>
              <label htmlFor="em-address">Address:</label>
              <label htmlFor="em-phone">Phone:</label>
              <label htmlFor="em-status">Status:</label>
            </div>

            <div id="em-inputs">
              <input
                id="em-start"
                type="date"
                defaultValue={formatDateForInput(event.startDate)}
                ref={startRef}
                required
                
              />

              <input
                id="em-end"
                type="date"
                defaultValue={formatDateForInput(event.enddate)}
                ref={endRef}
                required
              />

              <input
                id="em-name"
                defaultValue={event.eventname}
                ref={nameRef}
                required
              />

              <input
                id="em-place"
                defaultValue={event.orgname}
                ref={placeRef}
                required
              />

              <input
                id="em-address"
                defaultValue={event.eventaddress}
                ref={addressRef}
                required
              />

              <input
                id="em-phone"
                ref={phoneRef}
                defaultValue={event.phonenumber
                }
                // value={phone}
                // onChange={handlePhone}
                type="tel"
                placeholder="ex: 555-555-5555"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
              <select ref={statusRef} defaultValue={event.status}name="cars" id="cars">
                <option value="New">New</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div id='em-buttons' >
              <button type="button" onClick={handleSubmit}>Update</button>
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
              <button type="button" onClick={() => closeModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="event-modal-cloud"
        onClick={() => closeModal(false)}
      ></div>
      {}
    </Modal>
        </>
  );
};

export default EventModal;
