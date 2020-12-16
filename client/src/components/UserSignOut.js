import React from 'react';
import { Redirect } from 'react-router-dom';

function UserSignOut (props) {
    //add call to sign out
    return (
         <Redirect to="/courses" />
    )
}

export default UserSignOut;
