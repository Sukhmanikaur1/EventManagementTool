import {getAllEvents, addNewLangarEventInBackend,updateOneLangarEvent, deleteOneLangarEvent} from '../services/LangarEventService'
export const SET_LANGAR = 'SET_LANGAR'
export const setLangarEvents = (data) => ({
    type: SET_LANGAR,
    payload: data
})
export const getLangarEvents=() => async dispatch => { 
    let langarEvents = await getAllEvents()
 
    console.log(langarEvents)
    if(langarEvents.data.code==="SUCCESS"){
        sessionStorage.setItem("langar",JSON.stringify(langarEvents.data.data))
        dispatch(setLangarEvents(langarEvents.data.data))

    }
}
export const updateLangarEventById = (tokenId, langarEventData) => async dispatch => {
    let langarEvents = await updateOneLangarEvent(tokenId, langarEventData)
 
    console.log(langarEvents)
    
    if (langarEvents?.data?.code ==="SUCCESS"){
        sessionStorage.setItem("langar",JSON.stringify(langarEvents?.data?.data?langarEvents?.data?.data:[]))
        dispatch(setLangarEvents(langarEvents?.data?.data?langarEvents?.data?.data:[]))
        sessionStorage.setItem("last",JSON.stringify("langar"))
    }
    else { console.log("bad call")}
}
export const createNewLangarEvent = (data, tokenId) => async dispatch => {
    let newLangarEventList= await addNewLangarEventInBackend(tokenId, data)
    console.log(newLangarEventList)
    if(newLangarEventList.data.code==="SUCCESS"){
        sessionStorage.setItem("langar",JSON.stringify(newLangarEventList.data.data))
        sessionStorage.setItem("last",JSON.stringify("langar"))
        dispatch(setLangarEvents(newLangarEventList.data.data))

    }
}
export const deleteLangarEventById = (tokenId, langarEventData) => async dispatch => {
    let langarEvents = await deleteOneLangarEvent(tokenId, langarEventData)
 
    console.log(langarEvents)
    
    if (langarEvents?.data?.code ==="SUCCESS"){
        sessionStorage.setItem("langar",JSON.stringify(langarEvents?.data?.data?langarEvents?.data?.data:[]))
        dispatch(setLangarEvents(langarEvents?.data?.data?langarEvents?.data?.data:[]))
    }
    else { console.log("bad call")}
}