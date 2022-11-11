import React from "react";
import Modal from "./Modal";

import "../styles/langarModal.css"

const LangarModal = ({ event, closeModal }) => {
    console.log(event)

    const { startdate, user, eventphone } = event.ev

  return (
    <Modal>
      <div className="event-modal">
        <div className="event-details booked-details" id="la-details">
          <p className="event-p">
            <span>{`${startdate.split('-')[1]}/${startdate.split('-')[2].slice(0,2)}/${startdate.split('-')[0]}`}</span>
          </p>
          <p>
          has already been booked
          </p>
        <div>
            
            <span>Booked by:</span> 
            {user}
        </div>
        <div>
            <span>Phone number:</span> 
            {eventphone}
        </div>
                        
            <div id='em-buttons'>
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
