import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../Context'; 

function UpdateCourse (props) {
  const [course, setCourse ] = useState({});
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [materials, setMaterials] = useState('');
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
          console.log(course);
          setTitle(course.title);
          setDesc(course.description);
          setMaterials(course.materialsNeeded);
          setTime(course.estimatedTime);
        }
      });
  }, [props.match.params.id, history, authUser.id])

  return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input onChange={(e) => setTitle(e.target.value)}id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title}/></div>
                <p>{`By ${course.userFirstName} ${course.userLastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" onChange={(e) => setDesc(e.target.value)}name="description" className="" placeholder="Course description..." value={desc}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={time}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" onChange={(e) => setMaterials(e.target.value)}name="materialsNeeded" className="" placeholder="List materials..." value={materials}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
          </form>
        </div>
      </div>
    )
}

export default UpdateCourse;
