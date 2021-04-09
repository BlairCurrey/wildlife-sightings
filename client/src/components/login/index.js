import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        };
    };

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event){
        event.preventDefault();
        try{
        // post parameters
        const url = '/api/users/login';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };
        // post request
        let response = await fetch(url , options);
        let data = await response.json();
        console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <LoginForm
                    values={this.state}
                    onChange={(event) => this.handleChange(event)}
                    onSubmit={(event) => this.handleSubmit(event)}
                />
                <p>Not signed up yet?<Link to="/signup">Sign up</Link></p>
            </div>
        )
    }
}

export default Login;