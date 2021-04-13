import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: { marginTop: theme.spacing(5) },
    title: { marginBottom: theme.spacing(3) }
}));


function About(props){
    const classes = useStyles()
    return (
    <Container className={classes.container} component="main">
        <Typography 
            className={classes.title}
            variant="h2"
            component="h1"
        >
            About
        </Typography>
        <Typography paragraph="true">
            Wildlife Sightings allows you to report sigthings of select
            animals and view reports from others.
        </Typography>
    </Container>
    );
}

export default About;