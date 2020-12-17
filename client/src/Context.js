import React from 'react';
import base64 from 'base-64';

const signIn = (emailAddress, password) => {
    console.log('email:', emailAddress, 'password:', password);
    fetch(`http://127.0.0.1:5000/api/users/`, {
        headers: new Headers({
            "Authorization": `Basic ${base64.encode(`${emailAddress}:${password}`)}`,
        })
    })
    .then (res => res.json())
    .then(data => {
        console.log(data);
        if (data.message) {
            value.errors.push('Incorrect username and/or password');
            console.log(value.errors);
        } else {
            const { user } = data;
            value.authUser = user;
            value.authUser.password = password;
            console.log('authUser:', value.authUser);
        }
    })
}

const signOut = () => {
    console.log('sign out!')
}

export const value = {
    authUser: null,
    errors: [],
    actions: {
        signIn,
        signOut,
    }
    
}
const Context = React.createContext(value);

export default Context;

