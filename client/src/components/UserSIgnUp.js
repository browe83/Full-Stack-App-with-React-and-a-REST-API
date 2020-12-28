import React, { useContext, useState } from 'react';
import { Context }  from '../Context';
import { useHistory } from "react-router-dom";

function UserSignUp (props) {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ emailAddress, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const context = useContext(Context);

  function ErrorsDisplay ({ errors }) {
      let errorsDisplay = null;

      if (errors && errors.length) {
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

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setErrors(['Passwords do not match.'])
    } else {
      console.log('maybe sucessful login');
      const body = {
        firstName,
        lastName,
        emailAddress,
        password
      }
      fetch('http://127.0.0.1:5000/api/users/', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
          if (res.errors) {
            console.log('response:', res.errors);
            setErrors(res.errors);
          } else {
            console.log('successful sign up');
            context.actions.signIn(emailAddress, password);
            history.push('/');
          }
        })
    }
  }
  return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <ErrorsDisplay errors={errors}/>
            <form onSubmit={handleSubmit}>
              <div><input onChange={(e) => setFirstName(e.target.value)} id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName}/></div>
              <div><input onChange={(e) => setLastName(e.target.value)} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName}/></div>
              <div><input onChange={(e) => setEmail(e.target.value)} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress}/></div>
              <div><input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="" placeholder="Password" value={password}/></div>
              <div><input onChange={(e) => setConfirm(e.target.value)} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  value={confirm}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={context.actions.signIn}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
  )
}

export default UserSignUp;
