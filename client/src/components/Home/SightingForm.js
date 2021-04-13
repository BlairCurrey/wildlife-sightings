import Button from '@material-ui/core/Button';

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
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Animal *
            <select
                name="animalId"
                value={values.animalId}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            >
            <option value=""></option>
            {animals.map(a => (
                <option key={a.type} value={a._id}>
                    {a.type}
                </option>
            ))}
            </select>
            <div className="invalidInput">{touched.animalId && errors.animalId}</div>
        </label>

        <label>
            Latitude *
            <input
                type="text"
                name="latitude"
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            <div className="invalidInput">{touched.latitude && errors.latitude}</div>
        </label>
        <label>
            Longitude *
            <input
                type="text"
                name="longitude"
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            <div className="invalidInput">{touched.longitude && errors.longitude}</div>
        </label>
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
            <div className="invalidInput">{touched.date && errors.date}</div>
        </label>
        <label>
            Comments
            <textarea 
                name="comment"
                maxLength="500"
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <div className="invalidInput">{touched.comment && errors.comment}</div>
        </label>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    );
};

export default SightingForm;