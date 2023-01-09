import {login, registerUser} from "../services/UserService"
import { useNavigate } from "react-router-dom"

export const START_LOGIN = 'START_LOGIN'
export const login_user = (data) => ({
    type: START_LOGIN,
    payload: data
})
export const REGISTRATION = 'SUCCESS_REGISTRATION'
export const setRegistration = (data) => ({
    type: REGISTRATION,
    payload: data
})
export const FAILED_LOGIN = 'START_LOGIN'
export const failedLogin = (data) => ({
    type: FAILED_LOGIN,
    payload: {}
})
export const SIGNOUT = "SIGNOUT"
export const signout = () => ({
    type: SIGNOUT,
    payload: {}
})
export const getDbUser = (email, password) => async dispatch => { 
    let user = await login(email, password)
 
    if(user?.data?.user){ 
        console.log(user)
        user = user.data.user
        dispatch(login_user(user))
        console.log(JSON.stringify(JSON.stringify(user)))
        sessionStorage.setItem("user", JSON.stringify(user))
    }
    else{
        console.log("error")
        dispatch(failedLogin())
    }
    
}
export const signOut_handler = () => async dispatch=> {
    dispatch(signout())
}