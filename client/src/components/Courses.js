import React, { useState, useEffect } from 'react';

function Courses (props) {
  const [courses, setCourses ] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data.filteredCoursesInfo); 
        console.log(data.filteredCoursesInfo);
      });
  }, []);

  const courseLinks = courses.map(({ course }) => {
      return (
            <div className="grid-33"><a className="course--module course--link" href={`/courseDetails/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
            </a></div>
      );
  })
    return (
        <div className="bounds">
            {courseLinks}
            <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </a></div>
        </div>
    );
};

export default Courses;