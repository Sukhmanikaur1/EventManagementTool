import {getAllPaathEvents, addNewpaatheventInBackend,updateOnePaathEvent, deleteOnePaathEvent} from '../services/PaathService'
export const SET_PAATH = 'SET_PAATH'
export const setPaathEvents = (data) => ({
    type: SET_PAATH,
    payload: data
})
export const getPaathEvents=() => async dispatch => { 
    let paathEvents = await getAllPaathEvents()
 
    console.log(paathEvents)
    if(paathEvents.data.code==="SUCCESS"){
        sessionStorage.setItem("paath",JSON.stringify(paathEvents.data.data))
        dispatch(setPaathEvents(paathEvents.data.data))

    }
}
export const updatePaathEventById = (tokenId, paathEventData) => async dispatch => {
    let paathEvents = await updateOnePaathEvent(tokenId, paathEventData)
 
    console.log(paathEvents)
    
    if (paathEvents?.data?.code ==="SUCCESS"){
        sessionStorage.setItem("paath",JSON.stringify(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        // dispatch(setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        sessionStorage.setItem("last",JSON.stringify("paath"))
    }
    else { console.log("bad call")}
}
export const createNewPaathEvent = (data, tokenId) => async dispatch => {
    let newPaathEventList= await addNewpaatheventInBackend(tokenId, data)
    console.log(newPaathEventList)
    if(newPaathEventList?.data?.code==="SUCCESS"){
        sessionStorage.setItem("paath",JSON.stringify(newPaathEventList?.data?.data))
        sessionStorage.setItem("last",JSON.stringify("paath"))
        dispatch(setPaathEvents(newPaathEventList.data?.data))

    }
}
export const deletePaathEventById = (tokenId, paathEventData) => async dispatch => {
    let paathEvents = await deleteOnePaathEvent(tokenId, paathEventData)
 
    console.log(paathEvents)
    
    if (paathEvents?.data?.code ==="SUCCESS"){
        sessionStorage.setItem("paath",JSON.stringify(paathEvents?.data?.data?paathEvents?.data?.data:[]))
        dispatch(setPaathEvents(paathEvents?.data?.data?paathEvents?.data?.data:[]))
    }
    else { console.log("bad call")}
}