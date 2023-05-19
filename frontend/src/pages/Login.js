import React,{useRef,useEffect, useState} from 'react'
import {getDbUser} from '../actions/userActions'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import MessageModal from '../components/MessageModal'
const Login = () => {
    
    const [showModalMessage, setShowModalMessage]= useState(false)
  const [modalMessage, setModalMessage] = useState('')
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    let password =useRef('')
    let email = useRef('')
    const handleSubmit = async(e) => {
        e.preventDefault();
        // const res = await login(email, password)
        dispatch(getDbUser(email, password))
        setShowModalMessage(true)
    }
    const navigate = useNavigate();
    useEffect(() => {
        
        
        if(user.tokenId){
            setModalMessage("Login Successful.")
            setTimeout(()=>{

                navigate({pathname:`/`,search:`?tokenId=${user.tokenId}`,state:{user:user}})
            },1000)
        }
        else{ 
            setModalMessage("Login Failed please try again")
        }
    },[user])
     return (
        <main className="login-pg register-pgs">
            <h1><i className="fas fa-calendar-check"></i>Event Management Tool</h1>
            <div className="login-container">
                <h2 >Log in </h2>
                <form onSubmit={handleSubmit}>
                    <input ref={email} type="email" placeholder="Enter email address" required />
                    <input ref = {password} type="password" placeholder="Enter Password" required />
                    <button>Log in</button>
                </form>
                <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
            </div>
            {showModalMessage&& <MessageModal message={modalMessage} closeModal={setShowModalMessage} show={showModalMessage}/>}
        </main>
            
    )
}

export default Login
