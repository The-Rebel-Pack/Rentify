import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import BookList from "./components/listings/Booklist";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path={"/login"}>
                <Login />
              </Route>
              <Route path={"/book-list"}>
                <BookList />
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
