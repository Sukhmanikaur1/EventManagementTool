import EventService from "../services/EventService"
const EventServices = new EventService()

export const ADD_EVENT = 'ADD_EVENT'
export const addEvent = (data) => ({
    type: ADD_EVENT,
    payload: data
})

export const SET_EVENT = 'SET_EVENT'
export const setEvent = (data) => ({
    type: SET_EVENT,
    payload: data
})

export const TOGGLE_EVENT_DETAILS = 'TOGGLE_EVENT_DETAILS'
export const toggleEventDetails = (data) => ({
    type: TOGGLE_EVENT_DETAILS,
    payload: data
})

export const getDbEvents = () => async dispatch => {
    let events = await EventServices.getEvents()
    events = events.data
    console.log(events)
    dispatch(setEvent(events))
}

export const addDbEvent = ({ newEvent, history }) => async dispatch => {
    let event = await EventServices.createEvent(newEvent)
    event = event.data
    console.log(event)
    history.push(`/create-event/event-confirmation/${event.eventid}`)
    dispatch(addEvent(event))
}