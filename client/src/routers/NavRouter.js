import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Profile from '../components/profile/Profile';
import Listings from '../components/listings/Listings';
import DetailedListing from '../components/listings/DetailedListing';
import CreateListing from '../components/listings/CreateListing';

const NavRouter = (props) => {

    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path="/" >
                    <Listings />
                </Route>
                <Route path="/profile" >
                    <Profile />
                </Route>
                <Route path="/listings/create" >
                    <CreateListing />
                </Route>
                <Route path="/listings/:id" >
                    <DetailedListing />
                </Route>
            </Switch>
        </Router>
    )
}

export default NavRouter
