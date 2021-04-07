import React from "react";

class SightingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        // need to use arrow function on these functions instead
        // without these this binds
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    async handleSubmit(event) {
        event.preventDefault();
        try{
            const url = '/api/sightings'
            const options = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        let _ = await fetch(url , options);
        } catch (error) {
        console.log(error)
        }
    }

  todaysDate(){
    return new Date().toISOString().split("T")[0];
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <h2>Add a Sighting</h2>
        <label>
            userId *
            <input
            type='text'
            value={this.state.value}
            name="userId"
            onChange={this.handleChange}
            />
        </label>

        <label>
            Animal *
            <select
                name="animalId"
                value={this.state.value} 
                onChange={this.handleChange}
            >
            <option value=""></option>
            {this.props.animals.map(a => (
                <option key={a.type} value={a._id}>
                    {a.type}
                </option>
            ))}
            </select>
        </label>

        <label>
            Latitude *
            <input
            type='text'
             value={this.state.value}
             name="latitude"
              onChange={this.handleChange}
            />
        </label>
        <label>
            Longitude *
            <input
                type='text'
                value={this.state.value}
                name="longitude"
                onChange={this.handleChange}
            />
        </label>
        <label>
            Date *
        <input type="date"
            name="date"
            value={this.state.value}
            min="2020-01-01" 
            max={this.todaysDate()}
            onChange={this.handleChange}
        />
        </label>
        <label>
            Comments
        <textarea 
            name="comment"
            maxlength="500"
            value={this.state.value}
            onChange={this.handleChange}
        />
        </label>
        <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default SightingForm;