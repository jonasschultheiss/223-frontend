import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { UserContextProvider } from './context/user';

import Navbar from './components/Navbar';
import SignIn from './containers/signIn';
import SignUp from './containers/signUp';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Navbar />
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/user/:id"></Route>
          <Route exact path="/dashboard"></Route>
          <Route exact path="/post/:id"></Route>
          <Route exact path="/post/create"></Route>
          <Route exact path="/post/:id/delete"></Route>
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
