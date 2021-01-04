import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';

//Header component conditionally renders differently depending on whether the user is signed in or not.
function Header (props) {
    const context = useContext(Context);
    const { authUser } = context;

    return (
    <div className="header">
        <div className="bounds">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
                { authUser ?
                    <>
                        <span>Welcome, {authUser.firstName}!</span><Link className="signout" to={{pathname: "/signout", state: { from: window.location.pathname}}}>Sign Out</Link>
                    </>
                    :
                    <>
                        <Link className="signup" to={{pathname: "/signup", state: { from: window.location.pathname}}}>Sign Up</Link><Link className="/signin" to={{pathname: "/signin", state: { from: window.location.pathname}}}>Sign In</Link>
                    </>
                }
            </nav>
        </div>
    </div>
    );
}

export default Header;