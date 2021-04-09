import { React, useState, useEffect } from 'react';

import SightingFormWrapper from './SightingFormWrapper.js'
import Sightings from './Sightings.js';
import { 
  animalIdValidator,
  latitudeValidator,
  longitudeValidator,
  dateValidator,
  commentValidator
} from '../common/validators';

function Home(){
  const [result, setResult] = useState();
  const [animals, setAnimals] = useState([]);
  const [sightings, setSightings] = useState([]);

  const  validate = {
    animalId: animalIdValidator,
    latitude: latitudeValidator,
    longitude: longitudeValidator,
    date: dateValidator,
    comment: commentValidator
}
  const initialValues = {
    animalId: "",
    latitude: "",
    longitude: "",
    date: "",
    comment: ""
  }

  const fetchAnimals = async () => {
    const response = await fetch(`/api/animals`);
    const data = await response.json();
    setAnimals(data.animals);
  }

  const fetchSightings = async () => {
    const response = await fetch(`/api/sightings`);
    const data = await response.json();
    setSightings(data.sightings);
  }

  useEffect(() => {
    fetchAnimals();
    fetchSightings();
  }, []);

  const requestParams = data => {
    return ({
        url: '/api/sightings',
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

  return (
    <div className="Home">
      <h1>Homepage</h1>
      <h2>Add a Sighting</h2>
      <div>{result}</div>
      <SightingFormWrapper 
        animals={animals}
        fetchSightings={fetchSightings}
        validate={validate}
        initialValues={initialValues}
        requestParams={requestParams}
        setResponse={setResponse}
      />
      <Sightings sightings={sightings}/>
    </div>
  );
}

export default Home;