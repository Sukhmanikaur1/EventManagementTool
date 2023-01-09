import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import userReducer from './userReducer';
import slotReducer from './slotReducer';
import langarReducer from './langarReducer';
import personalReducer from './personalReducer'
const rootReducer = combineReducers({
    events: eventReducer,
    slots: slotReducer,
    users: userReducer,
    langars: langarReducer,
    personalEvent: personalReducer,                          
})

export default rootReducer;