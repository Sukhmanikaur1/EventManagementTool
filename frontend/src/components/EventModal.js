import React, { useRef } from "react";
import Modal from "./Modal";

import "../styles/slotModal.css";
import "../styles/eventModal.css";

const EventModal = ({ event, closeModal }) => {
  let nameRef = useRef();
  let startRef = useRef();
  let endRef = useRef();
  let placeRef = useRef();
  let addressRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (e) => {};

  const formatDateForInput = (date) => {
    let mm = date.split('-')[1]
    let dd = date.split('-')[2].slice(0,2)
    let yy = date.split('-')[0]
    return `${yy}-${mm}-${dd}`
  }

// value "11-03-2022" does not conform to the required format, "yyyy-MM-dd".

  return (
    <Modal>
      <div className="event-modal">
        <div className="event-details">
          <p className="event-p">
            <span>{event.eventname}</span> Event Details
          </p>

          <form onSubmit={handleSubmit} id="em-form">
            <div id='em-labels'>
              <label htmlFor="em-start">Start Date:</label>
              <label htmlFor="em-end">End Date:</label>
              <label id="em-name">Event Name:</label>
              <label htmlFor="em-place">Place:</label>
              <label htmlFor="em-address">Address:</label>
              <label htmlFor="em-phone">Phone:</label>
            </div>

            <div id="em-inputs">
              <input
                id="em-start"
                type="date"
                defaultValue={formatDateForInput(event.startdate)}
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
                defaultValue={event.eventplace}
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
                // ref={phoneRef}
                defaultValue={event.eventphone}
                // value={phone}
                // onChange={handlePhone}
                type="tel"
                placeholder="ex: 555-555-5555"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>

            <div id='em-buttons'>
              <button>Update</button>
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
    </Modal>
  );
};

export default EventModal;
