import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../Context'; 
import base64 from 'base-64';

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
// UpdateCourse is responsible for updating course information. It handles validation errors of course details.  
function UpdateCourse (props) {
  const [course, setCourse ] = useState({});
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [estimatedTime, setTime] = useState('');
  const [materialsNeeded, setMaterials] = useState('');
  const [errors, setErrors] = useState([]);
  const context = useContext(Context);
  const { authUser } = context;

  useEffect(() => {
      fetch(`http://127.0.0.1:5000/api/courses/${props.match.params.id}`)
      .then(response => response.json())
      .then(({ course }) => {
          setCourse(course);
          setTitle(course.title);
          setDesc(course.description);
          setMaterials(course.materialsNeeded);
          setTime(course.estimatedTime);
        });
  }, [props.match.params.id, history, authUser.id])

   function handleSubmit (e) {
      e.preventDefault();
      setErrors([]);
      const body = {
        title,
        description,
        materialsNeeded,
        estimatedTime
      }
      fetch(`http://127.0.0.1:5000/api/courses/${props.match.params.id}`, {
          method: 'PUT',
          headers: new Headers({
              "Authorization": `Basic ${base64.encode(`${authUser.emailAddress}:${authUser.password}`)}`,
              "Content-Type": "application/json",
          }),
          body: JSON.stringify(body),
      })
      .then(res => {
        if (res.status !== 204) {
          setErrors(['Please provide a valid title and/or description']);
        } else {
          history.push(`/courses/${props.match.params.id}`);
        }
      })
    }

  return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <ErrorsDisplay errors={errors}/>
                <div><input onChange={(e) => setTitle(e.target.value)}id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title}/></div>
                <p>{`By ${course.userFirstName} ${course.userLastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" onChange={(e) => setDesc(e.target.value)}name="description" className="" placeholder="Course description..." value={description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input  onChange={(e) => setTime(e.target.value)}id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={estimatedTime}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" onChange={(e) => setMaterials(e.target.value)}name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={() => history.push('/')}>Cancel</button></div>
          </form>
        </div>
      </div>
    )
}

export default UpdateCourse;
