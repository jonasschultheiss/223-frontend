import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/signin"></Route>
        <Route exact path="/signup"></Route>
        <Route exact path="/user/:id"></Route>
        <Route exact path="/dashboard"></Route>
        <Route exact path="/post/:id"></Route>
        <Route exact path="/post/create"></Route>
        <Route exact path="/post/:id/delete"></Route>
      </Switch>
    </Router>
  );
}

export default App;
