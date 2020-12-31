import React from 'react';

//Forbidden component renders when an unauthorized user or an unauthenticated user attempts to access the update or create course routes.
export default function  Forbidden (props) {
  return (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p>Please log in with correct username and password to access this page.</p>
    </div>
  )
};