// import React from "react";

function SightingForm(props){
    let todaysDate = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={props.onSubmit}>
        <h2>Add a Sighting</h2>
        <label>
            userId *
            <input
                type='text'
                value={props.values.userId}
                name="userId"
                onChange={props.onChange}
            />
        </label>

        <label>
            Animal *
            <select
                name="animalId"
                value={props.values.animalId}
                onChange={props.onChange}
            >
            <option value=""></option>
            {props.animals.map(a => (
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
                value={props.values.latitude}
                name="latitude"
                onChange={props.onChange}
            />
        </label>
        <label>
            Longitude *
            <input
                type='text'
                value={props.values.longitude}
                name="longitude"
                onChange={props.onChange}
            />
        </label>
        <label>
            Date *
        <input type="date"
            name="date"
            value={props.values.date}
            min="2020-01-01" 
            max={todaysDate}
            onChange={props.onChange}
        />
        </label>
        <label>
            Comments
        <textarea 
            name="comment"
            maxLength="500"
            value={props.values.comment}
            onChange={props.onChange}
        />
        </label>
        <input type="submit" value="Submit" />
        </form>
    );
};

export default SightingForm;