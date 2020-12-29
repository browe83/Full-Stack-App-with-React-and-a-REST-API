import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../Context';
import base64 from 'base-64';
import ReactMarkdown from "react-markdown";

function CourseDetail (props) {
  const [course, setCourse] = useState({});
  const history = useHistory();
  const context = useContext(Context);
  const { authUser } = context;

  useEffect(() => {
      fetch(`http://127.0.0.1:5000/api/courses/${props.match.params.id}`)
      .then(response => response.json())
      .then(({ course }) => {
        if (course === null || course === undefined) {
          history.push('/error');
        } else {
          setCourse(course);
        }
      });
  }, [props.match.params.id, history])

  function handleDelete(e) {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      fetch(`http://127.0.0.1:5000/api/courses/${props.match.params.id}`, {
        method: 'DELETE',
        headers: new Headers ({
          "Authorization": `Basic ${base64.encode(`${authUser.emailAddress}:${authUser.password}`)}`,
          "Content-Type": "application/json",
        }),
      })
      .then(res => {
        history.push('/');
      })
    } 
  }

  return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            { (authUser && (course.userId === authUser.id)) &&
                <span>
                  <a className="button" href={`/courses/${props.match.params.id}/update`} >Update Course</a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                  <a className="button" onClick={handleDelete} >Delete Course</a>
                </span>
            }
              <a className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {`${course.userFirstName} ${course.userLastName}`}</p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime ? <ReactMarkdown source={course.estimatedTime}/> : 'No estimate available'}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {(course.materialsNeeded) ? <ReactMarkdown source={course.materialsNeeded}/> : <li>No materials required</li>}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CourseDetail;