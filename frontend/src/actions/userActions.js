
export const SET_LOGIN = 'ADD_SLOT'
export const user = (data) => ({
    type: SET_LOGIN,
    payload: data
})

export const SET_SLOT = 'SET_SLOT'
export const setSlot = (data) => ({
    type: SET_SLOT,
    payload: data
})

export const UPDATE_SLOT = 'UPDATE_SLOT'
export const updateSlot = (data) => ({
    type: UPDATE_SLOT,
    payload: data
})

export const DELETE_SLOT = 'DELETE_SLOT'
export const deleteSlot = (data) => ({
    type: DELETE_SLOT,
    payload: data
})