import {updateOnePersonalEvents,getAllPersonalEvents, addNewPersonalEventInBackend,deleteOnePersonalEvents} from '../services/PersonalEventService'
export const SET_PERSONAL = 'SET_PERSONAL'
export const setPersonalEvents = (data) => ({
    type: SET_PERSONAL,
    payload: data
})
export const UPDATE_PERSONAL = 'SET_PERSONAL'
export const updatePersonalEvent = (data) => ({
    type: UPDATE_PERSONAL,
    payload: data
})
export const DELETE_PERSONAL = 'SET_PERSONAL'
export const deletePersonalEvent = (data) => ({
    type: UPDATE_PERSONAL,
    payload: data
})
export const updatePersonalEvents=( data ,tokenId) => async dispatch => { 
    let personalEvents = await updateOnePersonalEvents(data,tokenId)
 
    console.log(personalEvents)
    
    if (personalEvents?.data?.code ==="SUCCESS")
    dispatch(setPersonalEvents(personalEvents?.data?.data))
    else { console.log("bad call")}
}

export const deletePersonalEvents=( data ,tokenId) => async dispatch => { 
    let personalEvents = await deleteOnePersonalEvents(data,tokenId)
 
    console.log(personalEvents)
    
    if (personalEvents?.data?.code ==="SUCCESS")
    dispatch(setPersonalEvents(personalEvents?.data?.data))
    else { console.log("bad call")}
}
export const getPersonalEvents=( ) => async dispatch => { 
    let personalEvents = await getAllPersonalEvents()
 
    console.log(personalEvents)
    
    if (personalEvents?.data?.code ==="SUCCESS")
    dispatch(setPersonalEvents(personalEvents?.data?.data))
    else { console.log("bad call")}
}
export const createNewPersonalEvent = (tokenId,data) => async dispatch => {
    console.log("receiving data")
    console.log(data)
    let newPersonalEventList= await addNewPersonalEventInBackend(tokenId, data)
    
    console.log(newPersonalEventList)
    if (newPersonalEventList?.data?.code ==="SUCCESS")
    dispatch(setPersonalEvents(newPersonalEventList?.data?.data))
    else { console.log("bad call")}
}