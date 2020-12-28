import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../Context'; 
import base64 from 'base-64';
import { Redirect } from 'react-router-dom';

function CreateCourse (props) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [estimatedTime, setTime] = useState('');
  const [materialsNeeded, setMaterials] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const context = useContext(Context);
  const { authUser } = context;

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

  function handleSubmit (e) {
      e.preventDefault();
      setErrors([]);
      const body = {
        userId: authUser.id,
        title,
        description,
        materialsNeeded,
        estimatedTime
      }
      fetch(`http://127.0.0.1:5000/api/courses/`, {
          crossDomain:true,
          method: 'POST',
          headers: new Headers({
              "Authorization": `Basic ${base64.encode(`${authUser.emailAddress}:${authUser.password}`)}`,
              "Content-Type": "application/json",
          }),
          body: JSON.stringify(body),
      })
      // .then (res => res.text())
      .then(res => {
        if (res.status !== 201) {
          setErrors(res.errors);
          console.log('error response:', res);
        } else {
          console.log('response:', res);
          history.push(`/`);
        }
      })
    }

    return (
          <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <ErrorsDisplay errors={errors}/>
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" onChange={(e) => setTitle(e.target.value)} name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title}/></div>
                <p>By {`${authUser.firstName} ${authUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" onChange={(e) => setDesc(e.target.value)} name="description" className="" placeholder="Course description..." value={description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" onChange={(e) => setTime(e.target.value)} name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={estimatedTime}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" onChange={(e) => setMaterials(e.target.value)} name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={() => history.push('/')}>Cancel</button></div>
          </form>
        </div>
      </div>
    )
}

export default CreateCourse;