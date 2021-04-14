import React from 'react';
import { Box, Typography } from '@material-ui/core';

function NotFound(){
    return(
        <Box my={5}>
            <Typography 
                variant="h1" 
                align="center"
            >
                Page Not Found
            </Typography>
        </Box>
    )
}

export default NotFound;