import { ADD_EVENT, SET_EVENT, DELETE_EVENT, UPDATE_EVENT, TOGGLE_EVENT_DETAILS } from '../actions/actions';
import LSMimicDb from '../services/localStorageMimic'

export const initialState = {
    events: [],
    details: false
}

export default function eventReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_EVENT:
            LSMimicDb.events('create', action.payload)
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        case SET_EVENT:
            let mimicEvents = LSMimicDb.events('set')
            console.log(mimicEvents)
            return {
                ...state,
                events: action.payload ? action.payload : mimicEvents ? mimicEvents : []
            }
        case DELETE_EVENT:
            LSMimicDb.events('delete', null, action.payload)
            console.log(action.payload)
            return {
                ...state,
                events: state.events.filter(ev => ev.eventid !== action.payload)
            }
        case UPDATE_EVENT:
            LSMimicDb.events('update', action.payload)
            return {
                ...state,
                events: state.events.map(ev => ev.eventid === action.payload.eventid ? action.payload : ev)
            }
        case TOGGLE_EVENT_DETAILS:
            return {
                ...state,
                details: !state.details ? action.payload : false
            }
        default:
            return state;
    }
}