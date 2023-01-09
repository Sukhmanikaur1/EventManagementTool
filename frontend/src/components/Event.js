import React from "react";

// import { toggleEventDetails } from '../actions/actions'

import "../styles/event.css";

const Event = ({ event, setModal }) => {
  const handleClick = () => {
    // dispatch(toggleEventDetails(event))
    // history.replace(`/events/${event.eventid}`)
    setModal(event);
  };

  const displayDate = (date) => {
    if (event.type === "langar") {
      let { mm, yy, dd } = event.langarDate;
      return `${mm}/${dd}/${yy}`;
    } else {
      let sd = date.split("-");
      return `${sd[1]}/${sd[2].slice(0, 2)}/${sd[0]}`;
    }
  };

  return (
    <tr className="event" onClick={handleClick}>
      <td>{event.eventname}</td>
      <td>{event.eventplace}</td>
      <td>{displayDate(event.startdate)}</td>
      <td>{displayDate(event.enddate)}</td>
      <td>{event.status}</td>
    </tr>
  );
};

export default Event;
