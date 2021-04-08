import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )
}

export default Navbar;