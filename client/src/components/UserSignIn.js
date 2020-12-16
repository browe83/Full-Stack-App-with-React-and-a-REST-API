import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function UserSignIn (props) {
    const history = useHistory();
    // const [user, setUser] = useState({
    //     emailAddress: '',
    //     password: '',
    //     errors: [],
    // });
    
    function handleCancel (e) {
        e.preventDefault();
        history.push('/courses')
    }

    function handleSubmit () {

    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="user-sign-up">Click here</a> to sign up!</p>
        </div>
      </div>
    )
}

export default UserSignIn;
