import React from 'react';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm';

class Signup extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
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
        const url = '/api/users/signup';
        const options = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };
        // signup
        let signupResponse = await fetch(url , options);
        console.log(signupResponse)
        // this.props.history.push('/home')
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <div>
                <h1>Signup</h1>
                <SignupForm 
                    values={this.state}
                    onChange={(event) => this.handleChange(event)}
                    onSubmit={(event) => this.handleSubmit(event)}
                />
                <p>Already signed up?<Link to="/login">Login</Link></p>
            </div>
        )
    }
}

export default Signup;