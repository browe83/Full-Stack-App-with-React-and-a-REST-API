import React, { useEffect, useState } from 'react';
import base64 from 'base-64';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
export const Context = React.createContext();

function ContextProvider (props) {

    const getAuthUser = () => {
        const authUser = Cookies.getJSON('authUser');
        if (authUser) {
            return authUser;
        } else {
            return null;
        }
    }
    
    const [ authUser, setAuthUser ] = useState(getAuthUser);
    const [ errors, setErrors ] = useState(null);
    const history = useHistory();



    const signIn = (emailAddress, password) => {
        setErrors([]);
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
                user.password = password;
                Cookies.set('authUser', JSON.stringify(user), { expires: 1 })
                setAuthUser(user);
                history.push('/');
                console.log(`successful log in for user: ${user.firstName}`);
            }
        })
    }

    useEffect(() => {
        console.log('context authUser:', authUser);
    }, [authUser])

    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authUser');
    }

    return (
        <Context.Provider 
            value={{
                authUser,
                errors,
                actions: {
                    signIn,
                    signOut,
                    getAuthUser,
                }
            }}
        >{props.children}
        </Context.Provider>
    )
}



export default ContextProvider;

