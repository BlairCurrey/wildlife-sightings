import React from 'react';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <div>
            <h1>Login</h1>
            <p>Not signed up yet?<Link to="/signup">Sign up</Link></p>
        </div>
    )
}

export default Login;