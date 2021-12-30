import React, { useEffect } from 'react';
import './App.css';

import { database } from './services/EventService';

// import Home from './pages/Home';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { setEvent, getDbEvents } from './actions/actions'

import Paath from './pages/Paath';

// import NavBarTest from './components/NavBarTest';
// import Footer from './components/Footer';
// import Footer from './components/GeneralComponents/Footer';
// import NavLinks_NU from './components/NewUserComponents/NavLinks_NU';
// import CreateEvent from './pages/SignedIn/CreateEvent';
// import EventConfirmation from './pages/SignedIn/EventConfirmation';

import NavBar from './components/GeneralComponents/NavBar';
import { NavLinks_SI } from './components/SignedInComponenents/NavLinks_SI';
import { About } from './pages/GeneralPages/About';
import Contact from './pages/GeneralPages/Contact';
import Home_NU from './pages/NewUserPages/Home_NU';
import Login from './pages/NewUserPages/Login';
import SignUp from './pages/NewUserPages/SignUp';


function App() {

    let dispatch = useDispatch()
    let events = useSelector(state => state.events.events)

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
          <NavBar navlinkstype={<NavLinks_SI />} />
          <Switch>
            <Route exact path="/" component={Home_NU} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create-event" render={() => <NewEvent events={events} />} />
            <Route exact path="/manage-events" component={Events} />
            <Route path="/events/:id" component={Paath} />
          </Switch>
        </Router>
      </div>
    );
}

export default App;


/*

<Router>
        <NavBar/> 
            <NavBarTest />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/events" component={Events} />
                <Route path="/events/:id" component={Paath} />
                <Route path="/new-event" render={() => <NewEvent events={events} />} />
            </Switch>
            <Footer />
        </Router>

*/