import React,{useState,useEffect} from 'react'
import { Link, useHistory,useLocation } from 'react-router-dom';

const Login_SignUp = () => {
const [tokenId, setTokenId] = useState(null)
const history = useHistory()
const locations = useLocation()
useEffect(() => {
    // Update the document title using the browser API
    history.listen((location) => { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setTokenId(urlParams.get('tokenId'));
        console.log(location.state)
     }) 
  },[history]);
console.log(tokenId)
    return (
        <ul className="row align-items-center sign-up-custom">
            {tokenId?<><li className="col-auto login-link"><Link to="/">Sign Out</Link></li></>:
            <>
            <li className="col-auto login-link"><Link to="/login">Log In</Link></li>
            <li className="col-auto  login-link"><Link to="/signup"><button className="signup-btn p-1">Sign Up</button></Link></li>
            </>}
            
        </ul>
    )
}

export default EntryButtons
