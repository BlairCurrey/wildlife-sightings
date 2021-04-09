import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import FormWrapper from './FormWrapper';
import { 
    usernameValidator, 
    emailValidator, 
    passwordValidator
} from '../common/validators';

function Signup(){
    const [result, setResult] = useState();
    const  validate = {
        username: usernameValidator,
        email: emailValidator,
        password: passwordValidator,
    }
    const initialValues = {
        username: "",
        email: "",
        password: ""
    }
    const requestParams = data => {
        return ({
            url: '/api/users/signup',
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
            <h1>Signup</h1>
            <div>{result}</div>
            <FormWrapper 
                validate={validate}
                initialValues={initialValues}
                requestParams={requestParams}
                setResponse={setResponse}
            />
            <p>Already signed up?<Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup;