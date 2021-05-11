import { React, useState, useEffect } from "react";
import { Box, Paper } from "@material-ui/core";

import SightingFormWrapper from "./SightingFormWrapper.js";
import Sightings from "./Sightings.js";
import Map from "./Map.js";
import {
    animalIdValidator,
    latitudeValidator,
    longitudeValidator,
    dateValidator,
    commentValidator,
} from "../../utils/validators";

function Home(props) {
    const [result, setResult] = useState();
    const [animals, setAnimals] = useState([]);
    const [sightings, setSightings] = useState([]);
    const [rows, setRows] = useState([]);

    const validate = {
        animalId: animalIdValidator,
        latitude: latitudeValidator,
        longitude: longitudeValidator,
        date: dateValidator,
        comment: commentValidator,
    };
    const initialValues = {
        animalId: "",
        latitude: "",
        longitude: "",
        date: "",
        comment: "",
    };

    const fetchAnimals = async () => {
        const response = await fetch(`/api/animals`);
        const data = await response.json();
        setAnimals(data.animals);
    };

    const fetchSightings = async () => {
        const response = await fetch(`/api/sightings`);
        const data = await response.json();
        setSightings(data.sightings);
    };

    useEffect(() => {
        fetchAnimals();
        fetchSightings();
    }, []);

    const requestParams = (data) => {
        return {
            url: "/api/sightings",
            options: {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        };
    };
    const setResponse = async (requestResult) => {
        let data = await requestResult.json();
        setResult(data.message);
    };

    return (
        <Box my={5}>
            <Box my={1}>
                <Paper>
                    <SightingFormWrapper
                        animals={animals}
                        fetchSightings={fetchSightings}
                        validate={validate}
                        initialValues={initialValues}
                        requestParams={requestParams}
                        setResponse={setResponse}
                        result={result}
                    />
                </Paper>
            </Box>
            <Map sightings={sightings} />
            <Sightings sightings={sightings} />
        </Box>
    );
}

export default Home;
