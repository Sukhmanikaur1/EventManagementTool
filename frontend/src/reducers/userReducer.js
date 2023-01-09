const {REGISTRATION,SIGNOUT,START_LOGIN,END_LOGIN, UPDATE_SLOT,DELETE_SLOT} = require('../actions/userActions')

export const initialState = {
    user: {},
    currentUser: {},
    role: '',
    
} 

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        // case REGISTRATION:return {}
            // const res = await registerUser(action.payload)
            // if (res.data.code === 'success') {
            //     return{

            //         registration: true
            //      }
            // }
            // else{
            //     return{
            //         registration: false
            //     }
            // }
            
        
        case START_LOGIN:
            return {
                user: action.payload,
                isFetching: false,
                currentUser:action.payload
            }
            case END_LOGIN:
            return {
                
                // user: {...action.payload},
                
            }
        case SIGNOUT:
            return {
                user:{},
                currentUser: {},
                isFetching:false
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
