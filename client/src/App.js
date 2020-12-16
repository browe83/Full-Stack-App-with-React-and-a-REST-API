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

function App () {
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={Courses}></Route>
          <Route path='/courses/:id' component={CourseDetail}></Route>
          <Route path='/signin' component={UserSignIn}></Route>
          <Route path='/signup' component={UserSignUp}></Route>
          <Route path='/courses/create' component={CreateCourse}></Route>
          <Route path='/courses/:id/update' component={UpdateCourse}></Route>
          <Route path='/signout' component={UserSignOut}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
