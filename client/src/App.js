import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [courses, setCourses ] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data.filteredCoursesInfo); 
        console.log(data);
      });
  }, []);

// console.log(courses);
  const courseTitles = courses.map(course => <li>{course.course.title}</li>);

  return (
    <div className="App">
      <h1>hi</h1>
        <ul>
          {courseTitles}
        </ul>
    </div>
  );
}

export default App;
