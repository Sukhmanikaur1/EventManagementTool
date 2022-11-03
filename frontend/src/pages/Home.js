import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import '../styles/home.css'

const Home = () => {

  const role = useSelector(state => state.users.role)

  const guest = role === 'guest' ? true : false

  let history = useHistory();

  const handleButtonPress = (path) => {
    if (!guest) {
      history.push(path);
    }
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
      <section className="services">
        <div>
          <h2>
            {guest ? 
              "Sign up or Log In to:" 
              : 
              "Choose from:"
            }
          </h2>
            <span onClick={() => handleButtonPress('/book-a-slot')}>
              {guest ? 
                "Book a Paath Slot" 
                : 
                "Book A Slot"
              }
            </span>
            {/* <span onClick={() => handleButtonPress('/create-event/langar')}>
              Book a Langar Slot
            </span> */}
          <span onClick={() => handleButtonPress('/create-event')}>
            Create an Event
          </span>
          <span onClick={() => handleButtonPress('/manage-events')}>
            Manage Events
          </span>
        </div>
      </section>
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
