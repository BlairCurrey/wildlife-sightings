import React from 'react';
import { Container, Typography } from '@material-ui/core';

function About(props){
    return (
    <Container className="About">
        <Typography variant="h2" component="h1">About</Typography>
        <Typography variant="p">
            Wildlife Sightings allows you to report sigthings of select
            animals and view reports from others.
        </Typography>
    </Container>
    );
}

export default About;