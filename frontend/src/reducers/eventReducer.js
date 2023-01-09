import { ADD_EVENT, SET_EVENT,UPDATE_EVENT_OUTDATED, DELETE_EVENT, UPDATE_EVENT, TOGGLE_EVENT_DETAILS } from '../actions/actions';
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
            const currentDateset= new Date()
            let newarraymimicEvents= mimicEvents.filter(ev => {
                console.log(+new Date(ev.enddate)>+currentDateset)
                if(ev.eventtype === 'langar') return true
                return +new Date(ev.enddate) > +currentDateset})
                console.log(mimicEvents)
            return {
                ...state,
                events: action.payload ? action.payload : newarraymimicEvents ? newarraymimicEvents : []
            }
        case DELETE_EVENT:
            LSMimicDb.events('delete', null, action.payload)
            console.log(action.payload)
            return {
                ...state,
                events: state.events.filter(ev =>{if(
                    ev.eventid !== action.payload
                ) console.log(action.payload)
                    return ev.eventid !== action.payload})
            }
        case UPDATE_EVENT:
            LSMimicDb.events('update', action.payload)
            return {
                ...state,
                events: state.events.map(ev => ev.eventid === action.payload.eventid ? action.payload : ev)
            }
            case UPDATE_EVENT_OUTDATED:
            LSMimicDb.events('update', action.payload)
            let currentDate= new Date()
            return {
                ...state,
                events: state.events.filter(ev => {
                    console.log(ev)
                    if (ev.eventtype==="langar"){
                        console.log('this is langar')
                        return true
                    }
                    return +ev.enddate > currentDate})
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