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
import UserSignUp from './components/UserSIgnUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import ContextProvider from './Context';
import PrivateRoute from './components/PrivateRoute';

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
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
