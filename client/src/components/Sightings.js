import React from "react";

function Sightings(props){
    return (
    <div>
        <h2>Sightings</h2>
        {props.sightings.map(s => (
            <ul key={`${s._id}`}>
                <li key={`${s._id}-username`}>User: {s.user.username}</li>
                <li key={`${s._id}-date`}>Date: {s.date}</li>
                <li key={`${s._id}-animal`}>Animal: {s.animal.type}</li>
                <li key={`${s._id}-coordinates`}>Coordinates: {s.location.latitude}, {s.location.longitude}</li>
                <li key={`${s._id}-comment`}>Comment: {s.comment}</li>
                <li key={`${s._id}-submitted`}>Submitted: {s.createdAt}</li>
            </ul>
        ))}
    </div>
    )
}

export default Sightings;