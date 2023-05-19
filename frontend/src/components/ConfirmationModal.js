// confirmation modal with custom message in react bootstrap yes no
// Compare this snippet from EventManagementTool\frontend\src\components\PersonalEventModal.js:
import React, { useRef, useState, useEffect } from 'react';
import { Modal,Button } from 'bootstrap';


const ConfirmationModal = ({message, closeModal , show, setResult}) => {
    return ( <> 
           <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={()=>closeModal(false)}>
        <Modal.Body>
        {message}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={()=>setResult(true)}>
            Close
          </Button>
          <Button variant="secondary" onClick={()=>closeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>

    );
}
export default ConfirmationModal;