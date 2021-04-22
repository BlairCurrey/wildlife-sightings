import React from 'react';
import { 
    Button, 
    TextField, 
    MenuItem, 
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            padding: theme.spacing(1)
        },
    },
    title: {padding:theme.spacing(1)},
    button: {padding:theme.spacing(1)},
    fullWidth: {width: "100%"}
}));

function SightingForm({
    animals,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    result
}){
    let todaysDate = new Date().toISOString().split("T")[0];
    const classes = useStyles();
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <div>{result}</div>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <TextField
                        select
                        className={classes.fullWidth}
                        id="animalId"
                        name="animalId"
                        placeholder="animal"
                        label="Animal"
                        value={values.animalId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.animalId}
                        error={errors.animalId}
                        helperText={errors.animalId}
                        variant="outlined"
                        size="small"
                        required
                        >
                            {animals.map(a => (
                                <MenuItem key={a.type} value={a._id}>
                                    {a.type}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        type="date"
                        className={classes.fullWidth}
                        id="date"
                        name="date"
                        label="Date"
                        min="2020-01-01" 
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.date)}
                        helperText={errors.date}
                        variant="outlined"
                        size="small"
                        InputProps={{min: "2020-01-01", max: todaysDate}}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        type="text"
                        className={classes.fullWidth}
                        id="latitude"
                        name="latitude"
                        placeholder="0.000"
                        label="Latitude"
                        value={values.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.latitude)}
                        helperText={errors.latitude}
                        variant="outlined"
                        size="small"
                        required
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        type="text"
                        className={classes.fullWidth}
                        id="longitude"
                        name="longitude"
                        placeholder="0.000"
                        label="Longitude"
                        value={values.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.longitude)}
                        helperText={errors.longitude}
                        variant="outlined"
                        size="small"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        className={classes.fullWidth}
                        id="comment"
                        name="comment"
                        placeholder="Comments about the sighting"
                        label="Comment"
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.comment)}
                        helperText={errors.comment}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        required
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.button}>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Grid>
        </form>
    );
};

export default SightingForm;