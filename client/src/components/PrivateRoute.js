import React, { useContext, } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../Context';  

export default function PrivateRoute ({ component: Component, path, ...rest }) {
  const context = useContext(Context);
  const { authUser } = context;


    const courseId  = Number(rest.computedMatch.params.id);
    console.log('authUser.id:', typeof authUser.id, 'courseId:', typeof courseId);


  return (
    <Route
        {...rest}
            render={props => ((courseId && authUser.id === courseId) || (!courseId && authUser)) ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                pathname: '/forbidden',
                // state: { from: props.location },
            }} />
            )
        }
    />
    )




};