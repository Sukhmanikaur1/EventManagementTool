import React ,{useState,useEffect}from 'react'
import { NavLink , useNavigate, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {signOut_handler} from "../actions/userActions"
const normalLogin = {
    textDecoration: 'none'
}

const activeLogin = {
    color: 'black',
    fontWeight: '700',
    textDecoration: 'none'
}

const normalSignUp = {
    textDecoration: 'none',
    color: 'var(--orange-shade)',
    backgroundColor: 'var(--purple-shade)',
    borderRadius: '10px',
}
const activeSignUp = {
    textDecoration: 'none',
    fontWeight: '700',
    backgroundColor: 'var(--purple-shade)',
    borderRadius: '10px',
    color: 'black'
}

const EntryButtons = () => {
    let user = useSelector(state => state.users.currentUser)
    const dispatch=useDispatch()
    
    if (!user.fname && JSON.parse(sessionStorage.getItem('user'))?.fname)
    user= JSON.parse(sessionStorage.getItem('user'))
const [tokenId, setTokenId] = useState(null)
const navigate = useNavigate()
const locations = useLocation()
// useEffect(() => {
//     // Update the document title using the browser API
//     navigate.listen((location) => { 
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         setTokenId(urlParams.get('tokenId'));
//         console.log(location.state)
//      }) 
//   },[navigate]);
const handleClick =() =>{
    sessionStorage.removeItem('user')
    dispatch(signOut_handler())
}
console.log(tokenId)
    return (<>
        {user?.role?
        <>
        
        <NavLink to="/" className='nav-login' style={({ isActive }) =>
        isActive ? activeLogin : normalLogin
    }>
        <li onClick = { handleClick } className="col-auto login-link">
        Sign out 
        </li>
        </NavLink>
          </>  :<>            
                <NavLink to="/login" className='nav-login' style={({ isActive }) =>
                    isActive ? activeLogin : normalLogin
                }>
                    <li className="col-auto login-link">
                    Log In
                    </li>
                    </NavLink>
            
            <NavLink to="/signup" className='nav-signup' style={({ isActive }) =>
                    isActive ? activeSignUp : normalSignUp
                }>
            <li className="col-auto  login-link">
                Sign Up
                </li>
                    {/* <button className="signup-btn p-1">Sign Up</button> */}
                </NavLink>
        </>}
    </>
    )
}

export default EntryButtons
