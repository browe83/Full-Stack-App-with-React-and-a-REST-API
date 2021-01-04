import React, { useState } from 'react';
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
    
    const [ authUser, setAuthUser ] = useState(Cookies.getJSON('authUser'));
    // const [ authUser, setAuthUser ] = useState(getAuthUser);
    const [ errors, setErrors ] = useState(null);
    const history = useHistory();



    const signIn = (emailAddress, password, from) => {
        setErrors([]);
        fetch(`http://127.0.0.1:5000/api/users/`, {
            headers: new Headers({
                "Authorization": `Basic ${base64.encode(`${emailAddress}:${password}`)}`,
            })
        })
        .then (res => res.json())
        .then(data => {
            if (data.status === 401) {
                setErrors(['Incorrect username and/or password.'])
            } else if (data.status === 500) {
                setErrors(['Sorry, our server is experiencing problems. Please try back again soon.'])
            } else {
                const { user } = data;
                user.password = password;
                Cookies.set('authUser', JSON.stringify(user), { expires: 1 })
                setAuthUser(user);

                if (from === '/forbidden') {
                  history.go(-2);
                } else {
                  history.push(from ? from : '/');
                }
            }
        })
    }

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

