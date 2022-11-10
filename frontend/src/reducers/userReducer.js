const {SET_LOGIN,SET_SLOT, UPDATE_SLOT,DELETE_SLOT} = require('../actions/userActions')
export const initialState = {
    users: [],
    currentUser: 'Bob',
    role: 'admin'
    user:{},
    currentUser:{},
}

export default function eventReducer(state = initialState, action) {
    switch(action.type) {
        case SET_LOGIN:
            return {
                
                user: {...action.payload},
            }
        case SET_SLOT:
            return {
                ...state,
                slots: action.payload
            }
        case DELETE_SLOT:
            return {
                ...state,
                slots: state.slots.filter(s => s.id !== action.payload)
            }
        case UPDATE_SLOT:
            return {
                ...state,
                slots: state.slots.map(s => s.id === action.payload.id ? action.payload : s)
            }
        default:
            return state
    }
}
