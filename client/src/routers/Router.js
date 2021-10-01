import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Listings from '../components/listings/Listings';

const ContentRouter = (props) => {

  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/" >
          <Listings />
        </Route>
        <Route path="/listings/:id" >
          <Listings />
        </Route>
        {/* <Route path="/profile" >
          <Profile />
        </Route>
        <Route path="/listings/create" >
          <CreateListing />
        </Route>
        <Route path="/listings/edit/:id" >
          <EditListing />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default ContentRouter;
