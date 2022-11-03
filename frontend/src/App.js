import React, { useEffect } from 'react';
import './App.css';

import { database } from './services/EventService';

import ManageEvents from './pages/ManageEvents';
import NewEvent from './pages/NewEvent';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { setEvent, getDbEvents } from './actions/actions'

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
        
        if (database) {
            // real backend
           dispatch(getDbEvents())
        } else {

            // pretend backend
            let currentStorage = localStorage.getItem("events")
            if (currentStorage) {
                let parsedStorage = JSON.parse(currentStorage)
                console.log(parsedStorage)
                dispatch(setEvent(parsedStorage))
            }
        }
    }, [dispatch]) // Only adding this because it was complaining without it. Still a ComponentDidMount

    return (
        <div className="App">

        <Router>
          <NavBar navlinkstype={<NavLinks />} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create-event/event-confirmation/:id" component={EventConfirmation} />
            <Route path="/create-event/langar" render={() => <NewEvent events={events} />} />
            <Route exact path="/manage-events" component={ManageEvents} />
            {
              !guest &&
              <>
                <Route path="/book-a-slot" component={BookASlot} />
                <Route path="/create-event/paath" render={() => <NewEvent events={events} />} />
                {/* <Route exact path="/create-event" render={() => <NewEvent events={events} />} /> */}
                <Route path="/events/:id" component={Paath} />
              </>
            }
            <Route path="*">
              {
                guest ? 
                  <Redirect to="/login" />
                :
                  <Redirect to="/" />
              }
            </Route>
          </Switch>
        </Router>
      </div>
    );
}

export default App;


