import React from "react";
import SightingForm from './SightingForm.js';

class SightingFormWrapper extends React.Component{
    constructor(props) {
        super(props)
        this.state = {};
    };

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event){
        event.preventDefault();
        try{
        // post parameters
        const url = '/api/sightings';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };
        // post request
        let _ = await fetch(url , options);
        // update sightings
        this.props.fetchAndSave("sightings");
        } catch (error) {
            console.log(error);
        }
    }
    render(){
        return(
            <div>
                <SightingForm
                    animals={this.props.animals}
                    values={this.state}
                    onChange={(event) => this.handleChange(event)}
                    onSubmit={(event) => this.handleSubmit(event)}
                />
            </div>
        );
    }
};
export default SightingFormWrapper;