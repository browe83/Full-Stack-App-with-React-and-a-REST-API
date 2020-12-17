import React, { useContext, useState, useEffect } from 'react';
import Context from '../Context';
import { useHistory } from "react-router-dom";

function ErrorsDisplay ({ errors }) {
  let errorsDisplay = null;
  
  const context = useContext(Context);

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

function UserSignIn (props) {
    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPass ] = useState('');
    const context = useContext(Context);
    
    function handleCancel (e) {
        e.preventDefault();
        history.push('/')
    }

    function handleSubmit (e) {
      e.preventDefault();
      context.actions.signIn(email, password);
    }

    return (
      <>
        {/* <ErrorsDisplay errors={{ errors }}/> */}
            <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div><input onChange={(e) => setEmail(e.target.value)} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={email}/></div>
              <div><input onChange={(e) => setPass(e.target.value)} onPaste={(e) => setPass(e.target.value)}id="password" name="password" type="password" className="" placeholder="Password" value={password}/></div>
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
      </>

    )
}

export default UserSignIn;
