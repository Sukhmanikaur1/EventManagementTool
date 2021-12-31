import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Home_NU = () => {
  let paaths = useSelector((state) =>
    state.events.events.filter((e) => e.eventtype === "paath")
  );

  let [dropdown, setDropdown] = useState(false);
  let history = useHistory();

  const handlePaathClick = (e) => {
    history.push(`/events/${e.target.id}`);
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
            <button className="signup-btn">Sign up for free!</button>
          </form>
        </div>
      </section>
      <section className="services">
        <div>
          <h2>Sign up or Log In to:</h2>
            <span>
              <Link to="/book-a-slot/paath">Book a Paath Slot</Link>
            </span>
            <span>
              <Link to="/create-event/langar">Book a Langar Slot</Link>
            </span>
          <span>
            <Link to="/create-event">Create an Event</Link>
          </span>
          <span>
            <Link to="/manage-events">Manage Events</Link>
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

export default Home_NU;
