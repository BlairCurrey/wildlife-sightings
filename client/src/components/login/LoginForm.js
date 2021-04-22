import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root, Button': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
    }
}));

function LoginForm({
    values, 
    errors, 
    touched, 
    handleChange,
    handleBlur,
    handleSubmit
}){
    const classes = useStyles();
    return(
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                type="text"
                id="email"
                name="email"
                placeholder="email@domain.com"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email)}
                helperText={errors.email}
                variant="outlined"
                size="small"
                fullWidth
                required
            />
            <TextField
                type="password"
                id="password"
                name="password"
                placeholder="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password)}
                helperText={errors.password}
                variant="outlined"
                size="small"
                fullWidth
                required
            />
            <Button 
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
            >
                Log in
            </Button>
        </form>
    )
}

export default LoginForm;