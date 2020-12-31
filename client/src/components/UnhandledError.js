import React from 'react';

//The UnhandledError compenonet renders with the /error route is accessed due to a 500 server response.
export default function  UnhandledError (props) {
  return (
    <div className="bounds">
        <h1>Error</h1>
        <p>Oops! Sorry! Looks like there was an error on the server.</p>
    </div>
  )
};