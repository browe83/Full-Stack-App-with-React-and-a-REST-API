import React, { useEffect, useState } from 'react';
import base64 from 'base-64';
import { useHistory } from "react-router-dom";

export const Context = React.createContext();

function ContextProvider (props) {
    const [ authUser, setAuthUser ] = useState('');
    const [ errors, setErrors ] = useState(null);
    const history = useHistory();

    const signIn = (emailAddress, password) => {
        setErrors([]);
        console.log('email:', emailAddress, 'password:', password);
        fetch(`http://127.0.0.1:5000/api/users/`, {
            headers: new Headers({
                "Authorization": `Basic ${base64.encode(`${emailAddress}:${password}`)}`,
            })
        })
        .then (res => res.json())
        .then(data => {
        
            if (data.message) {
                setErrors(['Incorrect username and/or password.'])
            } else {
                const { user } = data;
                setAuthUser({...user, password});
                history.push('/');
                console.log('successful log in');
            }
        })
    }

    useEffect(() => {
        console.log(authUser)
    }, [authUser])

    const signOut = () => {
        setAuthUser(null);
    }

    return (
        <Context.Provider 
            value={{
                authUser,
                errors,
                actions: {
                    signIn,
                    signOut,
                }
            }}
        >{props.children}
        </Context.Provider>
    )
}



export default ContextProvider;

