import React from 'react';

//Not found component is rendered whenever user attempts to access a non-existent course or route.
export default function  NotFound (props) {
  return (
    <div className="bounds">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
  )
};
