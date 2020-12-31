import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Context } from '../Context';  

// The PrivateRoute component conditionally renders the UpdateCourse, CreateCourse or Foribidden Components depending on the user's authorization and authentication.
export default function PrivateRoute ({ component: Component, path, ...rest }) {
  const [isLoading, setIsLoading] = useState(true); 
  const [course, setCourse] = useState(null);
  const context = useContext(Context);
  const { authUser } = context;
  const courseId  = Number(rest.computedMatch.params.id) || null;
  const history = useHistory();

  const fetchCourse = () => {
      fetch(`http://127.0.0.1:5000/api/courses/${courseId}`)
      .then(response => response.json())
      .then(res => {
        if (res.status === 404) {
          history.push('/notfound');
        } else if (res.status === 500) {
          history.push('/error');
        } else {
          const course = res.course;
          setCourse(course);
        }
      })
   
  }
  
  useEffect(() => {
    if (courseId) fetchCourse();
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
              }} />
              )
          }
        />
      )}
    </>
  )

};