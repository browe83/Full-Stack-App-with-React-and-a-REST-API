import React, { useContext } from 'react';
import UserContext from '../Context';

function Header (props) {
    
    return (
    <div className="header">
        <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav><a className="signup" href="/user-sign-up">Sign Up</a><a className="signin" href="user-sign-in">Sign In</a></nav>
    </div>
    </div>
    );
}

export default Header;