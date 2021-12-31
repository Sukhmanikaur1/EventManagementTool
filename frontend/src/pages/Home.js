import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import '../styles/home.css'

const Home = () => {

  return (
    <main>
      <section className="hero">
        <h2>Book or create an event at your nearest Gurdwara Sahib!</h2>
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
          />
          <button>
            <Link to="/sign-up">
              <label htmlFor="email">Sign Up for Free!</label>
            </Link>
          </button>
        </form>
      </section>
      <section className="services-breakdown">
        <div>
          <button>
            <Link to="/new-event">Create an Event</Link>
          </button>
          <button>
            <Link to="/sign-up">Manage Events</Link>
          </button>
        </div>
        <img src="#" alt="home page example" />
      </section>
      <section>
        <div>
          <h2>Get Started</h2>
          <p>Discover Gurdwara Sahib events near you!</p>
          <div>
            <button>Log In</button>
            <button>Sign Up</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
