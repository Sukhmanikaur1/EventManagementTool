import { SET_LANGAR } from "../actions/langarActions"
export const initialState = {
    events: [],
    details: false
}
export default function langarReducer(state = initialState, action) {
    switch(action.type) {
        case SET_LANGAR:
            return{
                events: action.payload
            }
    default:
        return state
}
}
