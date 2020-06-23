import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { UserContextProvider } from './context/user';
import { APIContextProvider } from './context/api';

import Navbar from './components/Navbar';
import Index from './containers/index';
import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import User from './containers/user';
import CreatePost from './containers/createPost';

function App() {
  return (
    <Router>
      <APIContextProvider>
        <UserContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/user/:id">
              <User />
            </Route>
            <Route exact path="/post/create">
              <CreatePost />
            </Route>
            <Route exact path="/post/:id"></Route>
            <Route exact path="/post/:id/delete"></Route>
            <Route exact path="/dashboard"></Route>
          </Switch>
        </UserContextProvider>
      </APIContextProvider>
    </Router>
  );
}

export default App;
