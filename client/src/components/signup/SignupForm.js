import { Button, TextField } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root, Button': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
    }
}));

function SignupForm({
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
                id="username"
                name="username"
                placeholder="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.username}
                error={errors.username}
                helperText={errors.username}
                variant="outlined"
                size="small"
                fullWidth
                required
            />
            <TextField
                type="email"
                id="email"
                name="email"
                placeholder="email@domain.com"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.email}
                error={errors.email}
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
                touched={touched.password}
                error={errors.password}
                helperText={errors.password}
                variant="outlined"
                size="small"
                fullWidth
                required
            />
            <Button 
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Signup
            </Button>
        </form>
    )
}

export default SignupForm;