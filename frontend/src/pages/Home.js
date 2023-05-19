import React,{ useEffect,useMemo, useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LangarCalendar from "../components/LangarCalendar";
import {useDispatch} from 'react-redux'
import {updateEventOutdated} from '../actions/actions'
import PersonalEvent from '../components/PersonalEventTable'
import PersonalEventModal from '../components/PersonalEventModal'
import {getPersonalEvents} from '../actions/personalActions'
import '../styles/home.css'
import { setLangarEvents } from "../actions/langarActions";
import {getAllEvents} from '../services/LangarEventService'
import Footer from '../components/Footer'
const Home = () => {

  const role = useSelector(state => state.users.role)
  const events = useSelector(state => state.events.events)
  const dispatch = useDispatch()
  const user = JSON.parse(sessionStorage.getItem('user'))
  const guest = role === 'guest' ? true : false
  let navigate = useNavigate();
  const columns = useMemo(()=>[{
    Header:"Event Name",
    accessor:"eventname"
},
{
    Header:"Date",
    accessor:"eventdatetime"
},
{
    Header:"Host Name",
    accessor:"hostname"
},
{
    Header:"Description",
    accessor:"eventdescription"
}])
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

let newdate = year + "/" + month + "/" + day;
  const [personalEvents,setPersonalEvents]= useState([{}])
  const [ howManyPersonalEvents, setHowManyPersonalEvents] = useState(5)
  const [hasMorePersonalEvents,setHasMorePersonalEvents]  = useState(true)
 
 
  
  const handleButtonPress = (path) => {
    
      navigate(path);
  
  };
  const [modal, setModal]= useState(false)
  const [modalData, setModalData]= useState({})
  const setModals =(data)=>{
    setModalData(data)
    setModal(true)
  }
  let personalEventsData =[]
  const assignPersonalData=() => {
    setTimeout(()=> setPersonalEvents(JSON.parse(sessionStorage.getItem('personalEvents'))),1400)
    personalEventsData=JSON.parse(sessionStorage.getItem('personalEvents'))
  }
  const [langarEventsData,setLangarEventsData] =useState([])
  const assignLangarEvents = async() => {
    const res = await getAllEvents()
    if (res?.data?.code === "SUCCESS"){
      console.log("Success data.data langar ", res.data.data)
      setLangarEventsData(res?.data?.data)
    }
    else{
      setLangarEventsData([])
    }
    // setTimeout(()=> setLangarEvents(JSON.parse(sessionStorage.getItem('langar'))),1400)
    // setLangarEventsData(JSON.parse(sessionStorage.getItem('langar')))
    // console.log("langarEventsData")
    // console.log(langarEventsData)
  }
  useEffect(() => {
    dispatch(updateEventOutdated())
    dispatch(getPersonalEvents())
    
    setPersonalEvents()
    // setLangarEvents()
    assignPersonalData()
    assignLangarEvents()
  },[])
  
  
  
  console.log(personalEvents)
  if(!personalEventsData)
    personalEventsData=[{}]
  console.log(howManyPersonalEvents)
  return (
    <main>
      <section className="home-hero d-flex flex-column justify-content-center">
        <div className="home-hero-container">
          <h1 className="col-8">
            Book or create an event at your nearest Gurdwara Sahib!
          </h1>
          
          {!user?.fname?<form className="row d-flex">
            <input
              className="col"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="signup-btn" onClick={() => handleButtonPress('/signup')}>Sign up for free!</button>
          </form>:
          // <h1 className="col-8">Welcome {user?.fname} {user?.lname}!</h1>
          <><div className='cr-ev-btn-contain'>
          {user.role === 'admin' &&
              <Link to={"/create-event/paath/"+user.tokenId} style={{ textDecoration: 'none' }}>
                  <li className="col cr-ev-btn">Create Event</li> 
              </Link>
          }
      </div></>}
        </div>
      </section>
      <article className="mid-sec">
        <div className="container-for-contents">
      <div className="containter-for-title">
      <h2 className="table-title">Personal Events</h2>

      </div>
          <div className="containter-for-title">
          <h2>Langar</h2>

          </div>
        </div>
        <div className="container-for-contents">
      <section className="services">
        <div className="personal-event-box">
        
          {personalEvents?.length>0?<PersonalEvent setModals={setModals}columns={columns} data={personalEvents?.length>0?personalEvents:personalEventsData} />
          :<span>No personal Events booked.</span>}
          {/* <h2>
            {guest ? 
              "Sign up or Log In to:" 
              : 
              "Choose from:"
            }
          </h2>
            <span onClick={() => { if(JSON.parse(sessionStorage.getItem('user'))?.fname) handleButtonPress('/book-a-slot/paath')
            else { handleButtonPress('/login')}
            }}>
            Book a Paath Slot
            </span>
            <span onClick={() =>{if(JSON.parse(sessionStorage.getItem('user'))?.fname) handleButtonPress('/create-event/langar/'+user.tokenId)
          else { handleButtonPress('/login')}}}>
            Book a Langar
            </span> */}
            {/* <span onClick={() => handleButtonPress('/create-event/langar')}>
              Book a Langar Slot
            </span> */}

{modal && <PersonalEventModal personalEvent={modalData} closeModal={setModal} show={modal}/>}
        </div>
      </section>
      <section className="l-cal">
        <LangarCalendar events={langarEventsData} />
      </section>
      </div>
      </article>
      <Footer/>
      {/* {user?.fname?<section className="login-signup-banner-container">
        <div className="login-signup-banner">
          <h2>Get started </h2>
          <p>Discover Gurdwara Sahib events near you! </p>
          <div className="login-signup-banner-btns">
            <button>
              <Link to="/login">Log In</Link>
            </button>
            <button>
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Home;
