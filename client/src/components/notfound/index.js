import React from 'react';
import { Container, Typography } from '@material-ui/core';

function NotFound(){
    return(
        <Container>
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