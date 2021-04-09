import { React, useState } from 'react';
import { Link } from 'react-router-dom';

// import LoginForm from './LoginForm';
import LoginFormWrapper from './LoginFormWrapper';
import {  emailValidator, passwordValidator } from '../common/validators';

function Login (){
    const [result, setResult] = useState();
    const  validate = {
        email: emailValidator,
        password: passwordValidator,
    }
    const initialValues = {
        email: "",
        password: ""
    }

    const requestParams = data => {
        return ({
            url: '/api/users/login',
            options: {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        })
    }

    const setResponse = async requestResult => {
        let data = await requestResult.json();
        setResult(data.message)
    };

    return(
        <div>
            <h1>Login</h1>
            <div>{result}</div>
            <LoginFormWrapper
                validate={validate}
                initialValues={initialValues}
                requestParams={requestParams}
                setResponse={setResponse}
            />
            <p>Not signed up yet?<Link to="/signup">Sign up</Link></p>
        </div>
    )
}

export default Login;