import React from 'react';

function LoginForm(props){
    return(
        <form onSubmit={props.onSubmit}>
        <label>
            Email
            <input
                type='email'
                value={props.values.email}
                name="email"
                onChange={props.onChange}
            />
        </label>
        <label>
            Password
            <input
                type='password'
                value={props.values.password}
                name="password"
                onChange={props.onChange}
            />
        </label>
        <input type="submit" value="Submit" />
        </form>
    )
}

export default LoginForm;