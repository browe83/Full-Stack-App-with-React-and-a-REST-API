import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context'; 

function UserSignOut (props) {
    //add call to sign out
    const context = useContext(Context);
    console.log(context);
    context.actions.signOut();

    return (
         <Redirect to="/" />
    )
}

export default UserSignOut;
