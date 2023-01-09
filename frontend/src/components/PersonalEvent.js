import React from "react";

// import { toggleEventDetails } from '../actions/actions'

import "../styles/event.css";

const PersonalEvent = ({ event, setModal }) => {
  const handleClick = () => {
    // dispatch(toggleEventDetails(event))
    // history.replace(`/events/${event.eventid}`)
    setModal(event);
  };
  let yearmonthday= event.eventdate.split('-')
  let date = yearmonthday[1]+"/"+yearmonthday[2]+"/"+yearmonthday[0]
  console.log(yearmonthday[2])
  console.log(date)
  return (
    <tr className="event" onClick={handleClick}>
      <td>{event.eventname}</td>
      <td>{event.hostname}</td>
      <td>{date}</td>
      <td>{event.starttime}</td>
      <td>{event.endtime}</td>
    </tr>
  );
};

export default PersonalEvent;
