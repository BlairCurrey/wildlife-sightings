import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Grid } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

import LoginFormWrapper from './LoginFormWrapper';
import {  emailValidator, 
    passwordValidator 
} from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
    paper: { padding: "2rem" },
    grid: { marginTop: theme.spacing(5), maxWidth: "350px" },
    title: { marginBottom: theme.spacing(5) },
}));

function Login (){
    const [result, setResult] = useState();
    const  validate = {
        email: emailValidator,
        password: passwordValidator,
    }
    const initialValues = {
        email: "",
        password: ""
    }

    const requestParams = data => {
        return ({
            url: '/api/users/login',
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
                        Login
                    </Typography>
                    <div>{result}</div>
                    <LoginFormWrapper 
                        validate={validate}
                        initialValues={initialValues}
                        requestParams={requestParams}
                        setResponse={setResponse}
                    />
                    <Typography variant="body2" align="left">
                        <Link to="/signup">
                            Not signed up yet? Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>   
        </Grid>
    )
}

export default Login;