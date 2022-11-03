import React from 'react';
import Modal from './Modal';

import '../styles/slotModal.css'

const EventModal = ({ event, closeModal }) => {
console.log(event)
    return ( 
        <Modal>
            <div className='event-modal'>
                <div className='event-details'>
                    
                    <p className='event-p'>{event.eventname} Event Details</p>

                </div>
            </div>
            <div className='event-modal-cloud' onClick={() => closeModal(false)}></div>
        </Modal>
    );
}
 
export default EventModal;