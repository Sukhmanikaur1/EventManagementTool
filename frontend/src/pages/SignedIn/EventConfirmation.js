import React from 'react'

const EventConfirmation = () => {
    return (
        <main className="event-confirmation-pg">
            <div>
                <h1>Event Successfully Created</h1>
                <h2>Confirmation #</h2>
                <ul>
                    <li><span>Event Type: </span></li>                 <li><span>Start Date: </span></li>
                    <li><span>End Date:  </span></li>
                    <li><span>Location: </span></li>
                    <li><span>Address: </span></li>
                    <li><span>Phone Number: </span></li>
                </ul>
            </div>
        </main>
    )
}

export default EventConfirmation
