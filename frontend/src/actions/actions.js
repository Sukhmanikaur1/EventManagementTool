import EventService from "../services/EventService"
const EventServices = new EventService()

export const ADD_EVENT = 'ADD_EVENT'
export const addEvent = (data) => ({
    type: ADD_EVENT,
    payload: data
})

export const DELETE_EVENT = 'DELETE_EVENT'
export const deleteEvent = (data) => ({
    type: DELETE_EVENT,
    payload: data
})

export const UPDATE_EVENT = 'UPDATE_EVENT'
export const updateEvent = (data) => ({
    type: UPDATE_EVENT,
    payload: data
})
export const UPDATE_EVENT_OUTDATED = 'UPDATE_EVENT_OUTDATED'
export const updateEventOutdated = () => ({
    type: UPDATE_EVENT,
    payload: {}
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
    console.log(events)
    events = events.data.events
    console.log(events)
    dispatch(setEvent(events))
}

export const addDbEvent = ({ newEvent, navigate }) => async dispatch => {
    let event = await EventServices.createEvent(newEvent)
    event = event?.data?.data?.events
    dispatch(addEvent(event))
    navigate(`/create-event/event-confirmation/${event?.idEvent}`)
}