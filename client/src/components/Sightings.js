import React from "react";

class Sightings extends React.Component {
    state = { 
        sightings: [] 
    }

    async componentDidMount() {
        const url = "/api/sightings";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({sightings: data.sightings});
    }

    render() {
        return (
        <div>
            <h2>Sightings</h2>
            {this.state.sightings.map(s => (
                <ul>
                    <li>User: {s.user.username}</li>
                    <li>Date: {s.date}</li>
                    <li>Animal: {s.animal.type}</li>
                    <li>Coordinates: {s.location.latitude}, {s.location.longitude}</li>
                    <li>Comment: {s.comment}</li>
                    <li>Submitted: {s.createdAt}</li>
                </ul>
            ))}
        </div>
        )
    }
}

export default Sightings;