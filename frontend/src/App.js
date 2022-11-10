import React, { useEffect } from 'react';
import './App.css';

import ManageEvents from './pages/ManageEvents';
import NewEvent from './pages/NewEvent';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { setEvent } from './actions/actions'

import Paath from './pages/Paath';

import NavBar from './components/NavBar';
import { NavLinks } from './components/NavLinks';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BookASlot from './pages/BookASlot';
import EventConfirmation from './pages/EventConfirmation';


function App() {

    let dispatch = useDispatch()
    let events = useSelector(state => state.events.events)
    let role = useSelector(state => state.users.role)

    let guest = role === 'guest' ? true : false

    useEffect(() => {
      // won't be null if db 
      dispatch(setEvent(null))
    }, [dispatch]) // Only adding this because it was complaining without it. Still a ComponentDidMount

    return (
        <div className="App">

        <Router>
          <NavBar navlinkstype={<NavLinks />} />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/create-event/event-confirmation/:id" element={<EventConfirmation/>} />
            <Route path="/create-event/:eventtype" element={<NewEvent events={events} />} />
            <Route path="/create-event" element={<NewEvent events={events} />} />
            <Route path="/book-a-slot/paath" element={<BookASlot/>} />
            <Route path="/events/:id" element={<Paath/>} />
            {
              !guest &&
              <>
                <Route exact path="/manage-events" element={<ManageEvents/>} />
                {/* <Route exact path="/create-event" render={() => <NewEvent events={events} />} /> */}
              </>
            }
            {
            guest ?
              <Route path="*" element={<Navigate to="/login" />} />
                :
              <Route path="*" element={<Navigate to="/" />} />
            }
          </Routes>
        </Router>
      </div>
    );
}

export default App;


