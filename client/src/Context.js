import React, { useEffect, useState } from 'react';
import base64 from 'base-64';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
export const Context = React.createContext();

function ContextProvider (props) {
    const [ authUser, setAuthUser ] = useState(null);
    const [ errors, setErrors ] = useState(null);
    const [ isAuth, setIsAuth ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getAuthUser();
    }, []);

    useEffect(() => {
        if (authUser) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [authUser]);

    const getAuthUser = () => {
        const authUser = Cookies.getJSON('authUser');
        if (authUser) {
            setAuthUser(authUser);
            return authUser;
        } else {
            return null;
        }
    }

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
                user.password = password;
                Cookies.set('authUser', JSON.stringify(user), { expires: 1 })
                setAuthUser(Cookies.getJSON('authUser'));
                history.push('/');
                console.log(`successful log in for user: ${user.firstName}`);
            }
        })
    }

    useEffect(() => {
        console.log('context authUser:', authUser)
    }, [authUser])

    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authUser');
    }

    return (
        <Context.Provider 
            value={{
                authUser,
                isAuth,
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

