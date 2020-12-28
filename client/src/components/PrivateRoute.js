import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../Context';  

export default function PrivateRoute ({ component: Component, path, ...rest }) {
  const [isLoading, setIsLoading] = useState(true); 
  const [course, setCourse] = useState(null);
  const context = useContext(Context);
  const { authUser } = context;
  const courseId  = Number(rest.computedMatch.params.id);
  console.log('courseId:', courseId, 'authUser:', authUser);

  const fetchCourse = () => {
      fetch(`http://127.0.0.1:5000/api/courses/${courseId}`)
      .then(response => response.json())
      // .then(res => console.log('course response:', res))
      .then(res => {
        const course = res.course;
        console.log(course);
        setCourse(course);
      })
   
  }
  
  useEffect(() => {
    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (course || !courseId) setIsLoading(false)
  }, [course, courseId]);


  return (
    <>
      { !isLoading &&  (
        <Route
          {...rest}
              render={props => ((courseId && authUser !== null && authUser.id === course.userId) || (!courseId && authUser)) ? (
                  <Component {...props} />
              ) : (
                  <Redirect to={{
                  pathname: '/forbidden',
                  // state: { from: props.location },
              }} />
              )
          }
        />
      )}
    </>
  )

};