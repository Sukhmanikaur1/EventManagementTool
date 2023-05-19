import React ,{useRef, useEffect, useState}from "react";
import Modal from "./Modal";
import { useDispatch,useSelector } from "react-redux";
import ConfirmationModal from './ConfirmationModal';
import { deleteEvent, updateEvent } from "../actions/actions";
import "../styles/langarModal.css"
const LangarModal = (props) => {
  const { event, closeModal,updateLangar,deleteLangar,showConfirmationModal,setShowConfirmationModal,messageConfirmationModal,setResultConfirmationModal } = props;
  const { date, User, phonenumber, fullName } = event.ev
  console.log(props)
  
  const eventPhoneRef = useRef()
  const eventFullName = useRef()

  
  
  let user1 = useSelector(state => state.users.currentUser)
  if (!user1?.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
  user1= JSON.parse(sessionStorage.getItem('user'))
    console.log(event)
  console.log("langranmodal")

    const packageEvent = (event) => ({
  
      ...event.ev, 
      eventphone: eventPhoneRef.current.value,
      fullName: eventFullName.current.value,
      
    })
    console.log("user1",user1)
    console.log("User",User)
  return (
    <Modal>
      {/* <ConfirmationModal show={showConfirmationModal} closeModal={setShowConfirmationModal} message={messageConfirmationModal} setResult={setResultConfirmationModal} /> */}
        
      <div className="event-modal">
        <div className="event-details booked-details" id="la-details">
          <p className="event-p">
            <span>{`${date.split('-')[1]}/${date.split('-')[2].slice(0,2)}/${date.split('-')[0]}`}</span>
          </p>
          <p>
          {User?.email===user1?.username?"You have already booked":"has already been booked"}
          
          </p>
        <div>
            <span>Booked by:</span> 
            {User?.email===user1?.username||user1.role==="admin"?<input type="text" className="" defaultValue={fullName} ref={eventFullName}/>:<>{fullName}</>}
            
        </div>
        <div>
            <span>Phone number:</span> 
            {User?.email===user1?.username||user1.role==="admin"?<input type="text" className="" defaultValue={phonenumber} ref={eventPhoneRef}/>:<>{phonenumber}</>}

        </div>
                      
            <div id='em-buttons'>
            {User.email===user1?.username||user1.role==="admin"?<>
            <button className='create-button' type="button" onClick={() => updateLangar(packageEvent(event))}>
                Update
              </button>
              <button className='create-button' type="button" onClick={() => deleteLangar(packageEvent(event))}>
                Delete
              </button>
            </>
              :<></>}
              <button className='create-button' type="button" onClick={() => closeModal(false)}>
                Cancel
              </button>
            </div>
        </div>
      </div>
      <div
        className="event-modal-cloud"
        onClick={() => closeModal(false)}
      ></div>
    </Modal>
  );
};

export default LangarModal;
