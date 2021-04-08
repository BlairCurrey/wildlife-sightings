import React from 'react';
import { Link } from 'react-router-dom';

function Signup(){
    return(
        <div>
            <h1>Signup</h1>
            <p>Already signed up?<Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup;