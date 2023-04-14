import { SET_PAATH } from "../actions/paathActions"
export const initialState = {
    events: [],
    details: false
}
export default function paathReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PAATH:
            return{
                events: action.payload
            }
    default:
        return state
}
}
