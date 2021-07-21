import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Listings from "./components/listings/Listings";
import Nav from './components/navigation/Nav';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <Nav/>
          <BrowserRouter>
            <Switch>
              <Route path={"/"}>
                <Listings />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <h1>Rentify</h1>
      </header>
    </div>
  );
}

export default App;
