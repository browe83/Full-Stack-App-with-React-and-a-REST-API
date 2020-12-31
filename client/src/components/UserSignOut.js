import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context'; 

//UserSignOut component signs a user out and redirects to the course listing page.
function UserSignOut (props) {
    const context = useContext(Context);
    
    useEffect(() => {
      context.actions.signOut();
    })

    return (
         <Redirect to="/" />
    )
}

export default UserSignOut;
