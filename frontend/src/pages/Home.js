import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LangarCalendar from "../components/LangarCalendar";

import '../styles/home.css'

const Home = () => {

  const role = useSelector(state => state.users.role)
  const events = useSelector(state => state.events.events)

  const guest = role === 'guest' ? true : false

  let navigate = useNavigate();

  const handleButtonPress = (path) => {
    
      navigate(path);
  
  };
  
  return (
    <main>
      <section className="home-hero d-flex flex-column justify-content-center">
        <div>
          <h1 className="col-8">
            Book or create an event at your nearest Gurdwara Sahib!
          </h1>
          <form className="row d-flex">
            <input
              className="col"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="signup-btn" onClick={() => handleButtonPress('/signup')}>Sign up for free!</button>
          </form>
        </div>
      </section>
      <article className="mid-sec">
      <section className="services">
        <div>
          <h2>
            {guest ? 
              "Sign up or Log In to:" 
              : 
              "Choose from:"
            }
          </h2>
            <span onClick={() => handleButtonPress('/book-a-slot/paath')}>
            Book a Paath Slot
            </span>
            <span onClick={() => handleButtonPress('/create-event/langar')}>
            Book a Langar
            </span>
            {/* <span onClick={() => handleButtonPress('/create-event/langar')}>
              Book a Langar Slot
            </span> */}

          {
            !guest &&
            <>
            <span onClick={() => handleButtonPress('/create-event')}>
            Create an Event
          </span>
            
              <span onClick={() => handleButtonPress('/manage-events')}>
                Manage Events
              </span>
              </>
          }
        </div>
      </section>
      <section className="l-cal">
        <h2>Langar</h2>
        <LangarCalendar events={events} />
      </section>
      </article>
      <section className="login-signup-banner-container">
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
      </section>
    </main>
  );
};

export default Home;
