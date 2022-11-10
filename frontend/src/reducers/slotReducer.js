import { ADD_SLOT, DELETE_SLOT, SET_SLOT, UPDATE_SLOT } from '../actions/slotActions'

// For development purposes when no database present
import LSMimicDb from '../services/localStorageMimic'

export const initialState = {
    slots: []
}

export default function slotReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_SLOT:
            LSMimicDb.slots('create', action.payload)
            return {
                ...state,
                slots: [...state.slots, action.payload]
            }
        case SET_SLOT:
            let mimicSlots = LSMimicDb.slots('set')
            return {
                ...state,
                // if there is a payload, it's probably related to db so use it
                // if there isn't, check if the LSMimicDB method returned something
                // if it did, use it... if it didn't, somethings wrong... return array
                slots: action.payload ? action.payload : mimicSlots ? mimicSlots : []
            }
        case DELETE_SLOT:
            LSMimicDb.slots('delete', null, action.payload)
            return {
                ...state,
                slots: state.slots.filter(s => s.id !== action.payload)
            }
        case UPDATE_SLOT:
            LSMimicDb.slots('update', action.payload)
            return {
                ...state,
                slots: state.slots.map(s => s.id === action.payload.id ? action.payload : s)
            }
        default:
            return state
    }
}
