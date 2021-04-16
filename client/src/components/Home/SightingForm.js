import React from 'react';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root, Button': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
    }
}));

function SightingForm({
    animals,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
}){
    let todaysDate = new Date().toISOString().split("T")[0];
    const classes = useStyles();
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
        <TextField style={{minWidth: 150}}
          select
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
                <MenuItem key={a.type} value={a._id} ref={nodeRef}>
                    {a.type}
                </MenuItem>
            ))}
        </TextField>

        <TextField
            type="text"
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

        <TextField
            type="text"
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
        <label>
            Date *
            <input 
                type="date"
                name="date"
                min="2020-01-01" 
                value={values.date}
                max={todaysDate}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
        </label>
        <TextField
            type="text"
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
            required
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    );
};

export default SightingForm;