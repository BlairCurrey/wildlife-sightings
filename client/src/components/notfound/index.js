import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: { marginTop: theme.spacing(5) },
}));

function NotFound(){
    const classes = useStyles()
    return(
        <Container className={classes.container} component="main">
            <Typography 
                variant="h1" 
                align="center"
            >
                Page Not Found
            </Typography>
        </Container>
    )
}

export default NotFound;