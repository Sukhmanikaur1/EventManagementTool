import React, { useRef, useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';

import styles from'../styles/PersonalEventModal.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const PersonalEventModal = ({message, closeModal , show}) => {
    return ( <> 
           <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={()=>closeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {message}
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