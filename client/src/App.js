// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import ContextProvider from './Context';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

function App () {
  return (
    <Router>
      <ContextProvider>
          <Header />
        <Switch>
          <Route exact path='/' component={Courses}></Route>
          <PrivateRoute exact path='/courses/create' component={CreateCourse}></PrivateRoute>
          <Route exact path='/courses/:id' component={CourseDetail}></Route>
          <Route exact path='/signin' component={UserSignIn}></Route>
          <Route exact path='/signup' component={UserSignUp}></Route>
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse}></PrivateRoute>
          <Route exact path='/signout' component={UserSignOut}></Route>
          <Route exact path='/forbidden' component={Forbidden}></Route>
          <Route exact path='/error' component={UnhandledError}></Route>
          <Route path='/notfound' component={NotFound}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
