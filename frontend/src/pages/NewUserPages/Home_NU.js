import React,{useEffect, useState} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
// import { useSelector } from "react-redux";

const Home_NU = () => {
  
const [tokenIds, setTokenId] = useState(null)
const [userStatus,setUserStatus] = useState(null)
  // let paaths = useSelector((state) =>
  //   state.events.events.filter((e) => e.eventtype === "paath")
  // );

  // let [dropdown, setDropdown] = useState(false);
  let history = useHistory();
  const {tokenId} = useParams();
  useEffect(() => {
    // Update the document title using the browser API
    history.listen((location) => { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setTokenId(location);
        console.log(tokenId);
        if(location.state)setUserStatus(location?.state?.user)
     }) 
  },[history]);
  console.log(userStatus);
  const handleButtonPress = (path) => {
    history.push(path);
  };
  return (
    <main>
      <section className="home-hero d-flex flex-column justify-content-center">
        <div>
          <h1 className="col-8">
            Book or create an event at your nearest Gurdwara Sahib!
          </h1>
          {tokenId?<form className="row d-flex">
            <input
              className="col"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="signup-btn" onClick={() => handleButtonPress('/signup')}>Sign up for free!</button>
          </form>
            :<></>}
        </div>
      </section>
      <section className="services">
        <div>
        {userStatus?<h2>You are you may now Book</h2>:<h2>Sign up or Log In to:</h2>}
            <span onClick={() => handleButtonPress('/book-a-slot/paath')}>
              Book a Paath Slot
            </span>
            <span onClick={() => handleButtonPress('/create-event/langar')}>
              Book a Langar Slot
            </span>
          <span onClick={() => handleButtonPress('/create-event')}>
            Create an Event
          </span>
          <span onClick={() => handleButtonPress('/manage-events')}>
            Manage Events
          </span>
        </div>
      </section>
      {userStatus?<></>:<section className="login-signup-banner-container">
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
      </section>}
    </main>
  );
};

export default Home_NU;
