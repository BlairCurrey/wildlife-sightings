import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Grid } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

import SignupFormWrapper from './SignupFormWrapper';
import { 
    usernameValidator, 
    emailValidator, 
    passwordValidator
} from '../common/validators';

const useStyles = makeStyles((theme) => ({
    paper: { padding: "2rem" },
    grid: { maxWidth: "350px" },
    title: { marginBottom: theme.spacing(5) },
}));

function Signup(){
    const [result, setResult] = useState();
    const  validate = {
        username: usernameValidator,
        email: emailValidator,
        password: passwordValidator,
    }
    const initialValues = {
        username: "",
        email: "",
        password: ""
    }
    const requestParams = data => {
        return ({
            url: '/api/users/signup',
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

    const classes = useStyles();

    return(
        <Grid
            container
            direction="column"
            alignItems="center"
        >
            <Grid item className={classes.grid}>
                <Paper className={classes.paper}>
                    <Typography 
                        className={classes.title}
                        variant="h2" 
                        component="h1"
                        align="center"
                    >
                        Signup
                    </Typography>
                    <SignupFormWrapper 
                        validate={validate}
                        initialValues={initialValues}
                        requestParams={requestParams}
                        setResponse={setResponse}
                    />
                    <Typography 
                        variant="p" 
                        align="center"
                    >
                        <Link to="/login">
                            Already signed up? Login
                        </Link>
                    </Typography>
                </Paper>
            </Grid>   
        </Grid> 
    )
}

export default Signup;