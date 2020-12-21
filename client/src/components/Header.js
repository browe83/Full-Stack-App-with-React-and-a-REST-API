import React, { useContext } from 'react';
import { Context } from '../Context';

function Header (props) {
    const context = useContext(Context);
    const { isAuth, authUser } = context;

    return (
    <div className="header">
        <div className="bounds">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
                { isAuth ?
                    <>
                        <span>Welcome, {authUser.firstName}!</span><a className="signout" href="/signout">Sign Out</a>
                    </>
                    :
                    <>
                        <a className="signup" href="/signup">Sign Up</a><a className="/signin" href="/signin">Sign In</a>
                    </>
                }
            </nav>
        </div>
    </div>
    );
}

export default Header;