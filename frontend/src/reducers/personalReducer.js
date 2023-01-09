import { SET_PERSONAL, UPDATE_PERSONAL, DELETE_PERSONAL } from "../actions/personalActions"
export const initialState = {
    events: [],
    details: false
}
export default function personalReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PERSONAL:
            sessionStorage.setItem("personalEvents",JSON.stringify(action.payload))
            return{
                events: action.payload
            }
        
        case UPDATE_PERSONAL:
            sessionStorage.setItem("personalEvents",JSON.stringify(action.payload))
            return{...state,
                events: state.events.map(ev => ev.personaleventid === action.payload.personaleventid ? action.payload : ev)
            }
        case DELETE_PERSONAL:
            sessionStorage.setItem("personalEvents",JSON.stringify(action.payload))
            return{...state,
                events: state.events.map(ev => ev.personaleventid === action.payload.personaleventid ? action.payload : ev)
            }
        default:
            return state
}
}
